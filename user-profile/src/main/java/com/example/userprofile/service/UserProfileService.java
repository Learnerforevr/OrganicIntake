package com.example.userprofile.service;

import com.example.userprofile.requestDto.UserLoginRequestDto;
import com.example.userprofile.requestDto.UserRegistrationRequestDto;
import com.example.userprofile.responseDto.UserResponseDto;

import java.util.List;
import java.util.UUID;

public interface UserProfileService {

    UserResponseDto registerUser(UserRegistrationRequestDto request);

    UserResponseDto userLogin(UserLoginRequestDto userLoginRequestDto);

    UserResponseDto getUserById(UUID id);

    UserResponseDto getUserByEmail(String email);

    List<UserResponseDto> getAllUsers();

    void deleteUser(UUID id);
}
