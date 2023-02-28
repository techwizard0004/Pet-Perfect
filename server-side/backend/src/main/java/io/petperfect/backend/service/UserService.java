package io.petperfect.backend.service;

import java.util.List;

import io.petperfect.backend.entity.UserEntity;
import io.petperfect.backend.payloads.UpdateProfileRequest;
import io.petperfect.backend.payloads.UserRequest;
import io.petperfect.backend.payloads.UserResponse;

public interface UserService {

    public UserResponse saveUser(UserRequest user);

    List<UserResponse> findAll();

    UserResponse updateUser(UpdateProfileRequest userRequest, int id, String email);

    UserEntity findByEmail(String email);

    UserEntity findByUserId(Integer id);

    UserEntity convertUserRequestToUser(UserRequest userRequest);

    UserResponse convertUserToUserResponse(UserEntity user);

    Boolean activateUser(Integer id);

    Boolean deactivateUser(Integer id);

    String isUserActiveOrDeactive(Integer id);


}
