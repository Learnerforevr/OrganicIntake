package com.example.userprofile.repo;

import com.example.userprofile.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserProfileRepo extends JpaRepository<UserEntity, UUID>
{
    Optional<UserEntity> findByEmail(String email);
    boolean existsByEmail(String email);
}
