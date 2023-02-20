package io.petperfect.backend.service;

import java.util.List;

import io.petperfect.backend.entity.UserEntity;
import io.petperfect.backend.payloads.UserRequest;
import io.petperfect.backend.payloads.UserResponse;

public interface UserService {

    public UserResponse saveUser(UserRequest user);

    List<UserResponse> findAll();

    UserResponse updateUser(UserRequest userRequest, int id, String reqUseremail);

    UserEntity findByEmail(String email);

    boolean existsByEmail(String email);

    UserEntity convertUserRequestToUser(UserRequest userRequest);

    UserResponse convertUserToUserResponse(UserEntity user);

    Boolean activateUser(String email);

    Boolean deActivateUser(String email);

}
