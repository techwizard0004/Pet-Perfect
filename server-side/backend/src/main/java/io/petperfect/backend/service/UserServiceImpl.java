package io.petperfect.backend.service;

import io.petperfect.backend.entity.Role;
import io.petperfect.backend.entity.UserEntity;
import io.petperfect.backend.payloads.UserRequest;
import io.petperfect.backend.payloads.UserResponse;

import java.util.*;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.petperfect.backend.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired RoleService roleService;
    @Autowired
    private ModelMapper modelMapper;

    private static final Logger LOGGER = LogManager.getLogger(UserServiceImpl.class);

    @Override
    public UserResponse saveUser(UserRequest userRequest) {

        if (userRequest != null) {
            if (this.userRepo.findByEmailIgnoreCase(userRequest.getEmail()) == null) {
                Set<Role> roles = new HashSet<>();
                roles.add(roleService.findRoleByName(userRequest.getRole()));
                UserEntity user = this.convertUserRequestToUser(userRequest);
                user.setPassword(userRequest.getPassword());
                user.setRoles(roles);
                user = userRepo.save(user);
                LOGGER.info("USER_CREATED");
                return this.convertUserToUserResponse(user);
            } else {
                LOGGER.warn("User already exists");
              //  throw new ResourceAlreadyExists("User", EMAIL, userRequest.getEmail());
            }
        } else {
            //throw new MethodArgumentsNotFound("UserRequest is null");
            LOGGER.warn("User Request is null");
        }
        
        return null;
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
                //throw new UnauthorizedException("You are not authorized to update this user");
                LOGGER.warn("Unauthorize User Access");
            }
            user.setUserId(id);
            user.setEmail(userRequest.getEmail());
            user.setName(userRequest.getName());
           // user.setPassword(userRequest.getPassword());
            userRepo.save(user);
            LOGGER.info("USER_UPDATED");
            return this.convertUserToUserResponse(user);

        } else {
           // throw new MethodArgumentsNotFound("UserRequest or Id is null");
            return null;
        }
    }

    @Override
    public UserEntity findByEmail(String email) {
        // TODO Auto-generated method stub
        return null;
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
}