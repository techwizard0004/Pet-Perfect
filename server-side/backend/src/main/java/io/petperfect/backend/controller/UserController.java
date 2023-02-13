package io.petperfect.backend.controller;

import io.petperfect.backend.exception.MethodArgumentsNotFound;
import io.petperfect.backend.payloads.UserRequest;
import io.petperfect.backend.payloads.UserResponse;
import io.petperfect.backend.service.UserServiceImpl;
import jakarta.validation.Valid;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/backend/api")
public class UserController {

    private static final Logger LOGGER = LogManager.getLogger(UserController.class);

    @Autowired
    private UserServiceImpl userService;


    @GetMapping("/user/get-all")
    public ResponseEntity<List<UserResponse>> getAllUser(){
        return new ResponseEntity<>(this.userService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/user/save")
    public ResponseEntity<Boolean> saveUser(@Valid @RequestBody UserRequest userRequest){
        if(userRequest.getEmail()!=null){
            UserResponse user= this.userService.saveUser(userRequest);
            if(user==null){
                return new ResponseEntity<>(false,HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(true,HttpStatus.OK);
        }
       throw new MethodArgumentsNotFound("User Data is Not Given");
    }




}
