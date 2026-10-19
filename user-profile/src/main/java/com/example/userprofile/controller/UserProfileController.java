package com.example.userprofile.controller;

import com.example.userprofile.requestDto.UserLoginRequestDto;
import com.example.userprofile.requestDto.UserRegistrationRequestDto;
import com.example.userprofile.responseDto.UserResponseDto;
import com.example.userprofile.service.UserProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;

    /**
     * Register a new user.
     * Returns 201 Created with the Location header pointing to the newly created resource.
     */
    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(@Valid @RequestBody UserRegistrationRequestDto request) {
        log.info("Received request to register user with email: {}", request.email());
        var createdUser = userProfileService.registerUser(request);

        var location = URI.create(String.format("/api/v1/users/%s", createdUser.id()));
        return ResponseEntity.created(location).body(createdUser);
    }

    /**
     * User login.
     */
    @PostMapping("/login")
    public ResponseEntity<UserResponseDto> login(@Valid @RequestBody UserLoginRequestDto request) {
        log.info("Received request to login user with email: {}", request.email());
        return ResponseEntity.ok(userProfileService.userLogin(request));
    }

    /**
     * Retrieve a user by their unique UUID.
     * Returns 200 OK or 404 handled via GlobalExceptionHandler.
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable UUID id) {
        log.debug("Received request to fetch user by ID: {}", id);
        var user = userProfileService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    /**
     * Retrieve a user by email via query parameter (e.g., /api/v1/users/search?email=...).
     */
    @GetMapping("/search")
    public ResponseEntity<UserResponseDto> getUserByEmail(@RequestParam String email) {
        log.debug("Received request to fetch user by email: {}", email);
        var user = userProfileService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    /**
     * Retrieve all active (non-deleted) users.
     */
    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        log.debug("Received request to fetch all users");
        var users = userProfileService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    /**
     * Soft-delete a user by UUID.
     * Returns 204 No Content upon success.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        log.info("Received request to delete user with ID: {}", id);
        userProfileService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
