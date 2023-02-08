package io.petperfect.backend.service;

import io.petperfect.backend.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.petperfect.backend.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserEntity saveUser(UserEntity user) {
        // TODO Auto-generated method stub
        return null;
    }
}