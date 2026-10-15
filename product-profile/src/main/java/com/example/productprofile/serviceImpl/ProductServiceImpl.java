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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

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

        return entities.stream()
                .map(productMapper::toResponse)
                .toList();
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

        productRepository.delete(entity); // Triggers @SQLDelete
    }
}
