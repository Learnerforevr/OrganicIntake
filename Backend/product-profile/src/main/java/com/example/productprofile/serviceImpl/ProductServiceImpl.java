package com.example.productprofile.serviceImpl;

import com.example.productprofile.entity.ProductProfileEntity;
import com.example.productprofile.enums.ProductCategory;
import com.example.productprofile.enums.ProductStatus;
import com.example.productprofile.exception.ProductNotFoundException;
import com.example.productprofile.mapper.ProductMapper;
import com.example.productprofile.repo.ProductRepository;
import com.example.productprofile.requestDto.ProductCreateRequestDto;
import com.example.productprofile.requestDto.ProductUpdateRequestDto;
import com.example.productprofile.responseDto.ProductResponse;
import com.example.productprofile.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Autowired
    @Lazy
    private ProductServiceImpl self;

    @Override
    @Transactional
    public ProductResponse createProduct(ProductCreateRequestDto request) {
        log.info("Creating new product with name: {}", request.name());
        var entity = productMapper.toEntity(request);
        var savedEntity = productRepository.save(entity);
        log.info("Successfully created product with ID: {}", savedEntity.getId());
        return productMapper.toResponse(savedEntity);
    }

    @Override
    public String createProductInBulk(MultipartFile file) {
        List<ProductProfileEntity> allProducts = parseExcelFile(file);

        if (allProducts.isEmpty()) {
            return "No products found in the file.";
        }

        int batchSize = 1000;
        List<List<ProductProfileEntity>> batches = partitionList(allProducts, batchSize);

        log.info("Starting bulk upload for {} products in {} batches using Virtual Threads", allProducts.size(), batches.size());

        // Java 21 Virtual Threads Executor
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            List<CompletableFuture<Void>> futures = batches.stream()
                    .map(batch -> CompletableFuture.runAsync(() -> self.saveBatch(batch), executor))
                    .toList();

            // Wait for all virtual threads to complete
            CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
        }

        return String.format("Successfully processed and saved %d products.", allProducts.size());
    }

    // Must be public and transactional for Spring proxy interception
    @Transactional
    public void saveBatch(List<ProductProfileEntity> batch) {
        productRepository.saveAll(batch);
        log.debug("Saved batch of {} products on thread: {}", batch.size(), Thread.currentThread().getName());
    }

    private List<ProductProfileEntity> parseExcelFile(MultipartFile file) {
        List<ProductProfileEntity> products = new ArrayList<>();

        try (InputStream is = file.getInputStream();
             Workbook workbook = WorkbookFactory.create(is)) {

            Sheet sheet = workbook.getSheetAt(0);
            boolean isHeader = true;

            for (Row row : sheet) {
                if (isHeader) {
                    isHeader = false;
                    continue;
                }

                ProductProfileEntity product = new ProductProfileEntity();

                if (row.getCell(0) != null) {
                    product.setName(row.getCell(0).getStringCellValue());
                }

                if (row.getCell(1) != null) {
                    product.setDescription(row.getCell(1).getStringCellValue());
                }

                if (row.getCell(2) != null) {
                    product.setUnit(row.getCell(2).getStringCellValue());
                }

                if (row.getCell(3) != null) {
                    product.setPrice(BigDecimal.valueOf(row.getCell(3).getNumericCellValue()));}

                if (row.getCell(4) != null) {
                    product.setCategory(ProductCategory.valueOf(row.getCell(4).getStringCellValue()));
                }

                if (row.getCell(5) != null) {
                    product.setStatus(ProductStatus.valueOf(row.getCell(5).getStringCellValue()));
                }

                products.add(product);
            }
        } catch (Exception e) {
            log.error("Error parsing Excel file", e);
            throw new RuntimeException("Failed to parse Excel data: " + e.getMessage());
        }

        return products;
    }

    private <T> List<List<T>> partitionList(List<T> list, int batchSize) {
        List<List<T>> partitions = new ArrayList<>();
        for (int i = 0; i < list.size(); i += batchSize) {
            partitions.add(new ArrayList<>(list.subList(i, Math.min(i + batchSize, list.size()))));
        }
        return partitions;
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(UUID id) {
        log.debug("Fetching product by ID: {}", id);
        var entity = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        return productMapper.toResponse(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProducts(ProductCategory category, ProductStatus status) {
        log.debug("Fetching products with filter - category: {}, status: {}", category, status);
        List<ProductProfileEntity> entities;

        if (category != null && status != null) {
            entities = productRepository.findByCategoryAndStatus(category, status);
        } else if (category != null) {
            entities = productRepository.findByCategory(category);
        } else if (status != null) {
            entities = productRepository.findByStatus(status);
        } else {
            entities = productRepository.findAll();
        }

        return entities.stream().map(productMapper::toResponse).toList();
    }

    @Override
    @Transactional
    public ProductResponse updateProduct(UUID id, ProductUpdateRequestDto request) {
        log.info("Updating product with ID: {}", id);
        var entity = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        entity.setName(request.name().trim());
        entity.setDescription(request.description().trim());
        entity.setUnit(request.unit().trim());
        entity.setPrice(request.price());
        entity.setCategory(request.category());
        entity.setStatus(request.status());

        var updated = productRepository.save(entity);
        return productMapper.toResponse(updated);
    }

    @Override
    @Transactional
    public void deleteProduct(UUID id) {
        log.info("Soft-deleting product with ID: {}", id);
        var entity = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        productRepository.delete(entity);
    }
}