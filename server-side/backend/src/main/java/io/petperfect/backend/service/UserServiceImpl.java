package io.petperfect.backend.service;

import io.petperfect.backend.entity.Role;
import io.petperfect.backend.entity.UserEntity;
import io.petperfect.backend.exception.MethodArgumentsNotFound;
import io.petperfect.backend.exception.ResourceAlreadyExists;
import io.petperfect.backend.exception.ResourceNotFoundException;
import io.petperfect.backend.exception.UnauthorizedException;
import io.petperfect.backend.payloads.UpdateProfileRequest;
import io.petperfect.backend.payloads.UserRequest;
import io.petperfect.backend.payloads.UserResponse;

import java.util.*;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
            return users.stream().map(this::convertUserToUserResponse).toList();

        }
        return Collections.emptyList();
    }

    @Override
    public UserResponse updateUser(UpdateProfileRequest userRequest, int id, String email) {
        if (userRequest != null && id > 0) {

            UserEntity user = this.findByUserId(id);
            if(!(user.getEmail().equalsIgnoreCase(email)|| userRepo.findByEmailIgnoreCase(email).getRoles().stream().anyMatch(role -> role.getName().equalsIgnoreCase("ROLE_ADMIN")))) {
                throw new UnauthorizedException("Unauthorized user access");
            }
                user.setEmail(userRequest.getEmail());
                user.setContact(userRequest.getContact());
                user.setName(userRequest.getName());
                user.setAge(userRequest.getAge());
                user.setAddress(userRequest.getAddress());
                if (user.getRoles().stream().anyMatch(role -> role.getName().equalsIgnoreCase("ROLE_TRAINER") || role.getName().equalsIgnoreCase("ROLE_ADMIN"))) {
                    user.setLicenceNo(userRequest.getLicenceNo());
                    user.setShopName(userRequest.getShopName());
                }
                user = userRepo.save(user);
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
    public UserEntity findByUserId(Integer id) {
        if (id > 0) {
            UserEntity user = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("user", "id", id));
            LOGGER.info(USER_FOUND, user.getEmail());
            return user;
        } else {
            throw new MethodArgumentsNotFound("Id", "findById", id);
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
    public Boolean activateUser(Integer id) {
        UserEntity user = this.findByUserId(id);
        if(Boolean.FALSE.equals(user.getIsActive())){
            this.userRepo.activeUser(true,user.getEmail());
            return true;
        }
        else {
            throw new RuntimeException("User with Id: "+id+" already activated.");
        }

    }

    @Override
    public Boolean deactivateUser(Integer id) {
        UserEntity user = this.findByUserId(id);
        if(Boolean.TRUE.equals(user.getIsActive())){
            this.userRepo.activeUser(false,user.getEmail());
            return true;
        }
        else {
            throw new RuntimeException("User with Id: "+id+" already deactivated.");
        }
    }

    @Override
    public String isUserActiveOrDeactive(Integer id) {
        UserEntity user = this.findByUserId(id);
        if(Boolean.TRUE.equals(user.getIsActive())){
            return "ACTIVE";
        }else if(Boolean.FALSE.equals(user.getIsActive())){
            return "DEACTIVE";
        }
        else {
            throw new RuntimeException("User with Id: "+id+" already deactivated.");
        }
    }
}