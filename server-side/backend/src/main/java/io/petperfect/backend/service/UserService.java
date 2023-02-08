package io.petperfet.backend.service;

import io.petperfet.backend.entity.UserEntity;

public interface UserService {

    public UserEntity saveUser(UserEntity user);
}
