package io.petperfect.backend.controller;

import io.petperfect.backend.exception.MethodArgumentsNotFound;
import io.petperfect.backend.payloads.UserRequest;
import io.petperfect.backend.payloads.UserResponse;
import io.petperfect.backend.security.JwtTokenHelper;
import io.petperfect.backend.service.UserServiceImpl;
import jakarta.validation.Valid;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/backend/api")
public class   UserController {

    private static final Logger LOGGER = LogManager.getLogger(UserController.class);

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private JwtTokenHelper jwtTokenHelper;


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/user/get-all")
    public ResponseEntity<List<UserResponse>> getAllUser(){
        return new ResponseEntity<>(this.userService.findAll(), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
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

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/user/activate")
    public ResponseEntity<Boolean> activateUser(@RequestParam(required = true) String email){
        return new ResponseEntity<>(this.userService.activateUser(email),HttpStatus.OK);
    }





}
