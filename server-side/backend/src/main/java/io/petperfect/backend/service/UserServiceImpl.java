package io.petperfect.backend.service;

import io.petperfect.backend.entity.Role;
import io.petperfect.backend.entity.UserEntity;
import io.petperfect.backend.exception.MethodArgumentsNotFound;
import io.petperfect.backend.exception.ResourceAlreadyExists;
import io.petperfect.backend.exception.ResourceNotFoundException;
import io.petperfect.backend.exception.UnauthorizedException;
import io.petperfect.backend.payloads.UserRequest;
import io.petperfect.backend.payloads.UserResponse;

import java.util.*;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.petperfect.backend.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService {
    private static final Logger LOGGER = LogManager.getLogger(UserServiceImpl.class);

    private static final String USER_NOT_FOUND = "User not found with ";
    private static final String EMAIL = "email";
    private static final String USER_CREATED = "User created";
    private static final String USER_UPDATED = "User updated";
    private static final String USER_DELETED = "User deleted , id: {}";
    private static final String USER_FOUND = "User found , :{}";
    @Autowired
    private UserRepo userRepo;

    @Autowired RoleService roleService;
    @Autowired
    private ModelMapper modelMapper;


    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

    @Override
    public UserResponse saveUser(UserRequest userRequest) {

        if (userRequest != null) {
            if (this.userRepo.findByEmailIgnoreCase(userRequest.getEmail()) == null) {
                Set<Role> roles = new HashSet<>();
                roles.add(roleService.findRoleByName(userRequest.getRole()));
                UserEntity user = this.convertUserRequestToUser(userRequest);
                user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
                user.setRoles(roles);
                user = userRepo.save(user);
                LOGGER.info("USER_CREATED");
                return this.convertUserToUserResponse(user);
            } else {
                LOGGER.warn("User already exists");
              throw new ResourceAlreadyExists("User", EMAIL, userRequest.getEmail());
            }
        } else {
            throw new MethodArgumentsNotFound("UserRequest is null");

        }
        
}

    @Override
    public List<UserResponse> findAll() {
        List<UserEntity> users = userRepo.findAll();
        if (!users.isEmpty()) {
            return users.stream().map(this::convertUserToUserResponse).collect(Collectors.toList());

        }
        return Collections.emptyList();
    }

    @Override
    public UserResponse updateUser(UserRequest userRequest, int id, String reqUseremail) {
        if (userRequest != null && id > 0) {
            UserEntity user = this.userRepo.findById(id).orElseThrow();
            if(!user.getEmail().equalsIgnoreCase(reqUseremail)){
                throw new UnauthorizedException("You are not authorized to update this user");

            }
            user.setUserId(id);
            user.setEmail(userRequest.getEmail());
            user.setName(userRequest.getName());
           // user.setPassword(userRequest.getPassword());
            userRepo.save(user);
            LOGGER.info("USER_UPDATED");
            return this.convertUserToUserResponse(user);

        } else {
           throw new MethodArgumentsNotFound("UserRequest or Id is null");

        }
    }

    @Override
    public UserEntity findByEmail(String email) {
        if (!email.isEmpty()) {
            UserEntity user = userRepo.findByEmailIgnoreCase(email);
            if (user != null) {
                LOGGER.info(USER_FOUND, user.getEmail());
                return userRepo.findByEmailIgnoreCase(email);
            } else {
                throw new ResourceNotFoundException("user", EMAIL, email);
            }
        } else {
            throw new MethodArgumentsNotFound("Email", "findByEmail", email);
        }
    }

    @Override
    public UserEntity convertUserRequestToUser(UserRequest userRequest) {
        return modelMapper.map(userRequest, UserEntity.class);
    }

    @Override
    public UserResponse convertUserToUserResponse(UserEntity user) {
        UserResponse res = modelMapper.map(user, UserResponse.class);
        res.setRole(new ArrayList<>(user.getRoles()));
        return res;

    }

    @Override
    public UserResponse registerUser(UserRequest userRequest) {
        return null;
    }
}