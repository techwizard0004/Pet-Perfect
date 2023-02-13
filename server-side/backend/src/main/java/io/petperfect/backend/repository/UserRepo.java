package io.petperfect.backend.repository;

import io.petperfect.backend.entity.UserEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<UserEntity, Integer> {
    public UserEntity findByEmailIgnoreCase(String email);

    public void deleteByEmailIgnoreCase(String email);

    //public List<UserEntity> findByNameOrContactOrEmail(String keyword);
}
