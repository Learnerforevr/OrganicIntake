package com.example.farmerprofile.serviceImpl;

import com.example.farmerprofile.entity.FarmerProfileEntity;
import com.example.farmerprofile.exception.FarmerAlreadyExistsException;
import com.example.farmerprofile.exception.FarmerNotFoundException;
import com.example.farmerprofile.mapper.FarmerMapper;
import com.example.farmerprofile.repository.FarmerProfileRepository;
import com.example.farmerprofile.request.FarmerProfileCreateRequestDto;
import com.example.farmerprofile.request.FarmerProfileUpdateRequestDto;
import com.example.farmerprofile.response.FarmerProfileResponseDto;
import com.example.farmerprofile.service.FarmerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class FarmerServiceImpl implements FarmerService {

    private final FarmerProfileRepository farmerRepository;
    private final FarmerMapper farmerMapper;

    @Override
    @Transactional
    public FarmerProfileResponseDto createFarmerProfile(FarmerProfileCreateRequestDto request) {
        log.info("Creating farmer profile for user ID: {}", request.userId());

        if (farmerRepository.existsByUserId(request.userId())) {
            log.warn("Farmer profile creation failed: User ID {} already registered", request.userId());
            throw new FarmerAlreadyExistsException(request.userId());
        }

        var entity = farmerMapper.toEntity(request);
        var saved = farmerRepository.save(entity);

        log.info("Successfully created farmer profile with ID: {}", saved.getId());
        return farmerMapper.toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public FarmerProfileResponseDto getFarmerById(UUID id) {
        log.debug("Fetching farmer profile by ID: {}", id);

        var entity = farmerRepository.findById(id)
            .orElseThrow(() -> new FarmerNotFoundException(id));

        return farmerMapper.toResponse(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public FarmerProfileResponseDto getFarmerByUserId(UUID userId) {
        log.debug("Fetching farmer profile by user ID: {}", userId);

        var entity = farmerRepository.findByUserId(userId)
            .orElseThrow(() -> new FarmerNotFoundException("Farmer profile not found for user: " + userId));

        return farmerMapper.toResponse(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FarmerProfileResponseDto> getAllFarmers(String state, String district) {
        log.debug("Fetching farmers with filter - state: {}, district: {}", state, district);

        List<FarmerProfileEntity> entities;

        if (state != null && !state.isBlank() && district != null && !district.isBlank()) {
            entities = farmerRepository.findByStateIgnoreCaseAndDistrictIgnoreCase(state.trim(), district.trim());
        } else if (state != null && !state.isBlank()) {
            entities = farmerRepository.findByStateIgnoreCase(state.trim());
        } else {
            entities = farmerRepository.findAll();
        }

        return entities.stream()
            .map(farmerMapper::toResponse)
            .toList();
    }

    @Override
    @Transactional
    public FarmerProfileResponseDto updateFarmerProfile(UUID id, FarmerProfileUpdateRequestDto request) {
        log.info("Updating farmer profile with ID: {}", id);

        var entity = farmerRepository.findById(id)
            .orElseThrow(() -> new FarmerNotFoundException(id));

        entity.setFarmName(request.farmName().trim());
        entity.setFarmerStory(request.farmerStory() != null ? request.farmerStory().trim() : null);
        entity.setVillage(request.village().trim());
        entity.setDistrict(request.district().trim());
        entity.setState(request.state().trim());
        entity.setPincode(request.pincode().trim());
        entity.setLatitude(request.latitude());
        entity.setLongitude(request.longitude());
        entity.setTotalLandAreaAcres(request.totalLandAreaAcres());
        entity.setCertifications(new HashSet<>(request.certifications()));

        var updated = farmerRepository.save(entity);
        return farmerMapper.toResponse(updated);
    }

    @Override
    @Transactional
    public void deleteFarmerProfile(UUID id) {
        log.info("Soft-deleting farmer profile with ID: {}", id);

        var entity = farmerRepository.findById(id)
            .orElseThrow(() -> new FarmerNotFoundException(id));

        farmerRepository.delete(entity); // Triggers @SQLDelete
    }
}