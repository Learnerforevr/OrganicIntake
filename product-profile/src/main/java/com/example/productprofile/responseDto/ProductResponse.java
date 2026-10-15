package com.example.productprofile.responseDto;

import com.example.productprofile.enums.ProductCategory;
import com.example.productprofile.enums.ProductStatus;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record ProductResponse(
        UUID id,
        String name,
        String description,
        String unit,
        BigDecimal price,
        ProductCategory category,
        ProductStatus status,
        Instant createdAt,
        Instant updatedAt
) {}
