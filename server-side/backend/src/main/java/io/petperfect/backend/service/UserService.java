package io.petperfect.backend.service;

import io.petperfect.backend.entity.UserEntity;

public interface UserService {

    public UserEntity saveUser(UserEntity user);
}
