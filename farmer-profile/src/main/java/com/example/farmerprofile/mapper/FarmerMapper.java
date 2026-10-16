package com.example.farmerprofile.mapper;

import com.example.farmerprofile.entity.FarmerProfileEntity;
import com.example.farmerprofile.request.FarmerProfileCreateRequestDto;
import com.example.farmerprofile.response.FarmerProfileResponseDto;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Objects;

@Component
public class FarmerMapper {

    public FarmerProfileResponseDto toResponse(FarmerProfileEntity entity) {
        if (entity == null) {
            return null;
        }

        return new FarmerProfileResponseDto(
            entity.getId(),
            entity.getUserId(),
            entity.getFarmName(),
            entity.getFarmerStory(),
            entity.getVillage(),
            entity.getDistrict(),
            entity.getState(),
            entity.getPincode(),
            entity.getLatitude(),
            entity.getLongitude(),
            entity.getTotalLandAreaAcres(),
            entity.getCertifications(),
            entity.getCreatedAt(),
            entity.getUpdatedAt()
        );
    }

    public FarmerProfileEntity toEntity(FarmerProfileCreateRequestDto request) {
        if (request == null) {
            return null;
        }

        return FarmerProfileEntity.builder()
            .userId(Objects.requireNonNull(request.userId(), "User ID cannot be null"))
            .farmName(request.farmName().trim())
            .farmerStory(request.farmerStory() != null ? request.farmerStory().trim() : null)
            .village(request.village().trim())
            .district(request.district().trim())
            .state(request.state().trim())
            .pincode(request.pincode().trim())
            .latitude(request.latitude())
            .longitude(request.longitude())
            .totalLandAreaAcres(request.totalLandAreaAcres())
            .certifications(request.certifications() != null ? new HashSet<>(request.certifications()) : new HashSet<>())
            .deleted(false)
            .build();
    }
}