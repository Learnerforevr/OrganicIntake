package com.example.farmerprofile.repository;

import com.example.farmerprofile.entity.FarmerProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FarmerProfileRepository extends JpaRepository<FarmerProfileEntity, UUID> {
    Optional<FarmerProfileEntity> findByUserId(UUID userId);
    boolean existsByUserId(UUID userId);
    List<FarmerProfileEntity> findByStateIgnoreCase(String state);
    List<FarmerProfileEntity> findByStateIgnoreCaseAndDistrictIgnoreCase(String state, String district);
}
