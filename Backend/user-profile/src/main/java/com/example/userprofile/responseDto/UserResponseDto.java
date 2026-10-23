package com.example.userprofile.responseDto;

import com.example.userprofile.enums.Role;

import java.time.Instant;
import java.util.UUID;

public record UserResponseDto(
        UUID id,
        String email,
        String firstName,
        String lastName,
        Role role,
        Instant createdAt,
        Instant updatedAt
) {}
