package com.example.farmerprofile.response;

import com.example.farmerprofile.enums.CertificationType;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Set;
import java.util.UUID;

public record FarmerProfileResponseDto(
    UUID id,
    UUID userId,
    String farmName,
    String farmerStory,
    String village,
    String district,
    String state,
    String pincode,
    BigDecimal latitude,
    BigDecimal longitude,
    BigDecimal totalLandAreaAcres,
    Set<CertificationType> certifications,
    Instant createdAt,
    Instant updatedAt
) {}