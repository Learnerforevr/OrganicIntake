package com.example.farmerprofile.exception;
import java.util.UUID;

public class FarmerNotFoundException extends RuntimeException {
    public FarmerNotFoundException(UUID id) {
        super("Farmer profile not found with ID: " + id);
    }
    public FarmerNotFoundException(String message) {
        super(message);
    }
}