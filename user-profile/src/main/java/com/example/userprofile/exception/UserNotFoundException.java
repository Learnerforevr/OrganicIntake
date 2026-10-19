package com.example.userprofile.exception;

import java.util.UUID;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(UUID id) {
        super("User not found with ID: " + id);
    }
    public UserNotFoundException(String email) {
        super("User not found with email: " + email);
    }
}
