package com.example.productprofile.service;

import com.example.productprofile.enums.ProductCategory;
import com.example.productprofile.enums.ProductStatus;
import com.example.productprofile.requestDto.ProductCreateRequestDto;
import com.example.productprofile.requestDto.ProductUpdateRequestDto;
import com.example.productprofile.responseDto.ProductResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface ProductService {
    ProductResponse createProduct(ProductCreateRequestDto request);
    String createProductInBulk(MultipartFile productDataFile);
    ProductResponse getProductById(UUID id);
    List<ProductResponse> getAllProducts(ProductCategory category, ProductStatus status);
    ProductResponse updateProduct(UUID id, ProductUpdateRequestDto request);
    void deleteProduct(UUID id);
}
