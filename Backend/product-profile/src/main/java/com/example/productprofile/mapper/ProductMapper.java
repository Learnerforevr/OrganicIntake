package com.example.productprofile.mapper;

import com.example.productprofile.entity.ProductProfileEntity;
import com.example.productprofile.requestDto.ProductCreateRequestDto;
import com.example.productprofile.responseDto.ProductResponse;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class ProductMapper {
    public ProductResponse toResponse(ProductProfileEntity entity) {
        if (entity == null) {
            return null;
        }

        return new ProductResponse(
                entity.getId(),
                entity.getName(),
                entity.getDescription(),
                entity.getUnit(),
                entity.getPrice(),
                entity.getCategory(),
                entity.getStatus(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }

    public ProductProfileEntity toEntity(ProductCreateRequestDto request) {
        if (request == null) {
            return null;
        }

        return ProductProfileEntity.builder()
                .name(Objects.requireNonNull(request.name(), "Name cannot be null").trim())
                .description(Objects.requireNonNull(request.description(), "Description cannot be null").trim())
                .unit(Objects.requireNonNull(request.unit(), "Unit cannot be null").trim())
                .price(request.price())
                .category(request.category())
                .status(request.status())
                .deleted(false)
                .build();
    }
}
