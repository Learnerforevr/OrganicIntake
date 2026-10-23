package com.example.productprofile.repo;

import com.example.productprofile.entity.ProductProfileEntity;
import com.example.productprofile.enums.ProductCategory;
import com.example.productprofile.enums.ProductStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<ProductProfileEntity, UUID> {
    List<ProductProfileEntity> findByCategory(ProductCategory category);
    List<ProductProfileEntity> findByStatus(ProductStatus status);
    List<ProductProfileEntity> findByCategoryAndStatus(ProductCategory category, ProductStatus status);
}