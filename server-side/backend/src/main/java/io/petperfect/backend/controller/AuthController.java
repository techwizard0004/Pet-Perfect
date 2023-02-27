package io.petperfect.backend.controller;

import io.petperfect.backend.entity.Role;
import io.petperfect.backend.entity.UserEntity;
import io.petperfect.backend.exception.MethodArgumentsNotFound;
import io.petperfect.backend.payloads.JwtAuthReq;
import io.petperfect.backend.payloads.JwtAuthResponse;
import io.petperfect.backend.payloads.UserRequest;
import io.petperfect.backend.payloads.UserResponse;
import io.petperfect.backend.security.JwtTokenHelper;
import io.petperfect.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/backend/api")
public class AuthController {
    @Autowired private JwtTokenHelper jwtTokenHelper;

    @Autowired private UserDetailsService userDetailsService;

    @Autowired private AuthenticationManager authenticationManager;

    @Autowired private UserService userService;

    @PreAuthorize("permitAll()")
    @PostMapping("/public/login")
    public ResponseEntity<JwtAuthResponse> createToken(@Valid @RequestBody JwtAuthReq jwtAuthReq){
        this.authenticate(jwtAuthReq.getEmail(),jwtAuthReq.getPassword());
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(jwtAuthReq.getEmail());

        String token = this.jwtTokenHelper.generateToken(userDetails);

        JwtAuthResponse response = new JwtAuthResponse();
        response.setToken(token);
        UserEntity user = this.userService.findByEmail(jwtAuthReq.getEmail());
        response.setUserId(user.getUserId());
        response.setAuthenticated(true);
        response.setRole(user.getRoles().stream().map(Role::getName).toList());
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    private void authenticate(String email, String password) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email,password);
        this.authenticationManager.authenticate(authenticationToken);

    }

    @PreAuthorize("permitAll()")
    @PostMapping("/public/register")
    public ResponseEntity<Boolean> register(@Valid @RequestBody UserRequest userRequest){
        if(userRequest == null){
            throw new MethodArgumentsNotFound("User Request is null");
        }
        UserResponse res = this.userService.saveUser(userRequest);
        if(res!=null){
            return new ResponseEntity<>(Boolean.TRUE,HttpStatus.CREATED);
        }
        else return new ResponseEntity<>(Boolean.FALSE,HttpStatus.INTERNAL_SERVER_ERROR);


    }

}
