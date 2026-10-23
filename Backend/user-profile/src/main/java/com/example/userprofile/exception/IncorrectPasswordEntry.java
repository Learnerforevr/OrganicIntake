package com.example.userprofile.exception;

public class IncorrectPasswordEntry extends RuntimeException{
    public IncorrectPasswordEntry(String message){
        super(message);
    }
}
