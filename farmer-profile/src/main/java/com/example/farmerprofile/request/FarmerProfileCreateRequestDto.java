package com.example.farmerprofile.request;

import com.example.farmerprofile.enums.CertificationType;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.Set;
import java.util.UUID;

public record FarmerProfileCreateRequestDto(
        @NotNull(message = "User ID is required to link farmer profile")
        UUID userId,

        @NotBlank(message = "Farm name is required")
        @Size(max = 150, message = "Farm name cannot exceed 150 characters")
        String farmName,

        @Size(max = 1500, message = "Farmer story cannot exceed 1500 characters")
        String farmerStory,

        @NotBlank(message = "Village is required")
        String village,

        @NotBlank(message = "District is required")
        String district,

        @NotBlank(message = "State is required")
        String state,

        @NotBlank(message = "Pincode is required")
        @Pattern(regexp = "^[0-9]{6}$", message = "Pincode must be a valid 6-digit code")
        String pincode,

        @DecimalMin(value = "-90.0", message = "Latitude must be >= -90.0")
        @DecimalMax(value = "90.0", message = "Latitude must be <= 90.0")
        BigDecimal latitude,

        @DecimalMin(value = "-180.0", message = "Longitude must be >= -180.0")
        @DecimalMax(value = "180.0", message = "Longitude must be <= 180.0")
        BigDecimal longitude,

        @DecimalMin(value = "0.1", message = "Land area must be greater than 0")
        BigDecimal totalLandAreaAcres,

        @NotEmpty(message = "At least one certification type or non-certified flag must be supplied")
        Set<CertificationType> certifications
) {}
