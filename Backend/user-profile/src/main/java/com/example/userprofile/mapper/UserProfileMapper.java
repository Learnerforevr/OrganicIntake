package com.example.userprofile.mapper;

import com.example.userprofile.entity.UserEntity;
import com.example.userprofile.requestDto.UserRegistrationRequestDto;
import com.example.userprofile.responseDto.UserResponseDto;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class UserProfileMapper
{
    public UserResponseDto toResponse(UserEntity entity) {
        if (entity == null) {
            return null;
        }

        return new UserResponseDto(
                entity.getId(),
                entity.getEmail(),
                entity.getFirstName(),
                entity.getLastName(),
                entity.getRole(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }

    public UserEntity toEntity(UserRegistrationRequestDto request) {
        if (request == null) {
            return null;
        }

        return UserEntity.builder()
                .email(Objects.requireNonNull(request.email(), "Email cannot be null").trim().toLowerCase())
                .passwordHash(request.password()) // Phase 1: Raw password; hashed in Phase 2
                .firstName(Objects.requireNonNull(request.firstName(), "First name cannot be null").trim())
                .lastName(Objects.requireNonNull(request.lastName(), "Last name cannot be null").trim())
                .role(request.role())
                .deleted(false)
                .build();
    }
}
