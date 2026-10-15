package com.example.productprofile.requestDto;

import com.example.productprofile.enums.ProductCategory;
import com.example.productprofile.enums.ProductStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record ProductUpdateRequestDto(
        @NotBlank(message = "Product name is required")
        @Size(max = 120, message = "Product name cannot exceed 120 characters")
        String name,

        @NotBlank(message = "Description is required")
        @Size(max = 1000, message = "Description cannot exceed 1000 characters")
        String description,

        @NotBlank(message = "Unit measurement is required")
        String unit,

        @NotNull(message = "Price is required")
        @DecimalMin(value = "0.01", message = "Price must be greater than zero")
        BigDecimal price,

        @NotNull(message = "Category is required")
        ProductCategory category,

        @NotNull(message = "Status is required")
        ProductStatus status
) {}