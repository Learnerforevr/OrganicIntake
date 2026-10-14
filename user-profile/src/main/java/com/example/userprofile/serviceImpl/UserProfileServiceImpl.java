package com.example.userprofile.serviceImpl;

import com.example.userprofile.exception.UserAlreadyExistsException;
import com.example.userprofile.exception.UserNotFoundException;
import com.example.userprofile.mapper.UserProfileMapper;
import com.example.userprofile.repo.UserProfileRepo;
import com.example.userprofile.requestDto.UserRegistrationRequestDto;
import com.example.userprofile.responseDto.UserResponseDto;
import com.example.userprofile.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

    private final UserProfileRepo userRepository;
    private final UserProfileMapper userMapper;

    @Override
    @Transactional
    public UserResponseDto registerUser(UserRegistrationRequestDto request) {
        log.info("Processing user registration for email: {}", request.email());

        var normalizedEmail = request.email().trim().toLowerCase();

        if (userRepository.existsByEmail(normalizedEmail)) {
            log.warn("Registration rejected. Email already exists: {}", normalizedEmail);
            throw new UserAlreadyExistsException("Email is already registered: " + normalizedEmail);
        }

        var userEntity = userMapper.toEntity(request);
        var savedUser = userRepository.save(userEntity);

        log.info("Successfully registered user with ID: {}", savedUser.getId());
        return userMapper.toResponse(savedUser);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDto getUserById(UUID id) {
        log.debug("Fetching user with ID: {}", id);

        var userEntity = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        return userMapper.toResponse(userEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDto getUserByEmail(String email) {
        var normalizedEmail = email.trim().toLowerCase();
        log.debug("Fetching user with email: {}", normalizedEmail);

        var userEntity = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new UserNotFoundException(normalizedEmail));

        return userMapper.toResponse(userEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponseDto> getAllUsers() {
        log.debug("Fetching all active users");

        return userRepository.findAll().stream()
                .map(userMapper::toResponse)
                .toList(); // Java 16+ / 21 immutable list collector
    }

    @Override
    @Transactional
    public void deleteUser(UUID id) {
        log.info("Soft-deleting user with ID: {}", id);

        var userEntity = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        // Hibernate executes the @SQLDelete annotation to soft-delete
        userRepository.delete(userEntity);
        log.info("User with ID: {} marked as deleted", id);
    }
}
