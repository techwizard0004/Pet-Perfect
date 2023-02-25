package io.petperfect.backend.repository;

import io.petperfect.backend.entity.UserEntity;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<UserEntity, Integer> {
    public UserEntity findByEmailIgnoreCase(String email);



    public void deleteByEmailIgnoreCase(String email);

    @Transactional
    @Modifying
    @Query("update UserEntity u set u.isActive = :status where u.email = :email")
    void activeUser(@Param("status") Boolean status, @Param("email") String email);
}
