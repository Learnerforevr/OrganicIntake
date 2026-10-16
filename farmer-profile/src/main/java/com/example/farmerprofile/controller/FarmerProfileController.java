package com.example.farmerprofile.controller;

import com.example.farmerprofile.request.FarmerProfileCreateRequestDto;
import com.example.farmerprofile.request.FarmerProfileUpdateRequestDto;
import com.example.farmerprofile.response.FarmerProfileResponseDto;
import com.example.farmerprofile.service.FarmerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1/farmers")
@RequiredArgsConstructor
public class FarmerProfileController {

    private final FarmerService farmerService;

    @PostMapping
    public ResponseEntity<FarmerProfileResponseDto> createFarmerProfile(@Valid @RequestBody FarmerProfileCreateRequestDto request) {
        log.info("Received request to create farmer profile for user ID: {}", request.userId());
        var response = farmerService.createFarmerProfile(request);
        var location = URI.create(String.format("/api/v1/farmers/%s", response.id()));
        return ResponseEntity.created(location).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FarmerProfileResponseDto> getFarmerById(@PathVariable UUID id) {
        log.debug("Received request to fetch farmer by ID: {}", id);
        return ResponseEntity.ok(farmerService.getFarmerById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<FarmerProfileResponseDto> getFarmerByUserId(@PathVariable UUID userId) {
        log.debug("Received request to fetch farmer by User ID: {}", userId);
        return ResponseEntity.ok(farmerService.getFarmerByUserId(userId));
    }

    @GetMapping
    public ResponseEntity<List<FarmerProfileResponseDto>> getAllFarmers(
        @RequestParam(required = false) String state,
        @RequestParam(required = false) String district
    ) {
        log.debug("Received query for farmers with state={}, district={}", state, district);
        return ResponseEntity.ok(farmerService.getAllFarmers(state, district));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FarmerProfileResponseDto> updateFarmerProfile(
        @PathVariable UUID id,
        @Valid @RequestBody FarmerProfileUpdateRequestDto request
    ) {
        log.info("Received request to update farmer profile ID: {}", id);
        return ResponseEntity.ok(farmerService.updateFarmerProfile(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFarmerProfile(@PathVariable UUID id) {
        log.info("Received request to delete farmer profile ID: {}", id);
        farmerService.deleteFarmerProfile(id);
        return ResponseEntity.noContent().build();
    }
}