package io.petperfect.backend.controller;

import io.petperfect.backend.payloads.UserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/get-all")
    public ResponseEntity<List<UserResponse>> getAllUser(){
        return new ResponseEntity(Collections.emptyList(), HttpStatus.OK);
    }
}
