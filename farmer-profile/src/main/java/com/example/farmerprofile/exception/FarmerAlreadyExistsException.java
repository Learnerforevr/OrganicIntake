package com.example.farmerprofile.exception;

import java.util.UUID;

public class FarmerAlreadyExistsException extends RuntimeException {
    public FarmerAlreadyExistsException(UUID userId) {
        super("Farmer profile already registered for user ID: " + userId);
    }
}