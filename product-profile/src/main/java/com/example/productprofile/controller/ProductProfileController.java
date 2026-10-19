package com.example.productprofile.controller;

import com.example.productprofile.enums.ProductCategory;
import com.example.productprofile.enums.ProductStatus;
import com.example.productprofile.requestDto.ProductCreateRequestDto;
import com.example.productprofile.requestDto.ProductUpdateRequestDto;
import com.example.productprofile.responseDto.ProductResponse;
import com.example.productprofile.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductProfileController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody ProductCreateRequestDto request) {
        log.info("Received request to create product: {}", request.name());
        var response = productService.createProduct(request);
        var location = URI.create(String.format("/api/v1/products/%s", response.id()));
        return ResponseEntity.created(location).body(response);
    }

    @PostMapping(value = "/bulk", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createProductInBulk(@RequestParam("file") MultipartFile file) {
        log.info("Received request to bulk create products from file: {}", file.getOriginalFilename());
        String responseMessage = productService.createProductInBulk(file);
        return ResponseEntity.ok(responseMessage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable UUID id) {
        log.debug("Received request to get product ID: {}", id);
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts(
            @RequestParam(required = false) ProductCategory category,
            @RequestParam(required = false) ProductStatus status
    ) {
        log.debug("Received query for products with category={} and status={}", category, status);
        return ResponseEntity.ok(productService.getAllProducts(category, status));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable UUID id,
            @Valid @RequestBody ProductUpdateRequestDto request
    ) {
        log.info("Received request to update product ID: {}", id);
        return ResponseEntity.ok(productService.updateProduct(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID id) {
        log.info("Received request to delete product ID: {}", id);
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
