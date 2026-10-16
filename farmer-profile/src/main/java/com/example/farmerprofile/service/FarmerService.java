package com.example.farmerprofile.service;

import com.example.farmerprofile.request.FarmerProfileCreateRequestDto;
import com.example.farmerprofile.request.FarmerProfileUpdateRequestDto;
import com.example.farmerprofile.response.FarmerProfileResponseDto;

import java.util.List;
import java.util.UUID;

public interface FarmerService {
    FarmerProfileResponseDto createFarmerProfile(FarmerProfileCreateRequestDto request);
    FarmerProfileResponseDto getFarmerById(UUID id);
    FarmerProfileResponseDto getFarmerByUserId(UUID userId);
    List<FarmerProfileResponseDto> getAllFarmers(String state, String district);
    FarmerProfileResponseDto updateFarmerProfile(UUID id, FarmerProfileUpdateRequestDto request);
    void deleteFarmerProfile(UUID id);
}