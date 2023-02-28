package io.petperfect.backend.controller;

import io.petperfect.backend.exception.MethodArgumentsNotFound;
import io.petperfect.backend.payloads.UpdateProfileRequest;
import io.petperfect.backend.payloads.UserRequest;
import io.petperfect.backend.payloads.UserResponse;
import io.petperfect.backend.security.JwtTokenHelper;
import io.petperfect.backend.service.UserServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/backend/api")
public class   UserController {

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
    public ResponseEntity<Boolean> activateUser(@RequestParam(required = true) Integer id){
        return new ResponseEntity<>(this.userService.activateUser(id),HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/user/deactivate")
    public ResponseEntity<Boolean> deactivateUser(@RequestParam(required = true) Integer id){
        return new ResponseEntity<>(this.userService.deactivateUser(id),HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER','ROLE_TRAINER')")
    @GetMapping("/user/profile")
    public ResponseEntity<UserResponse> getUserProfile(Principal principal){
        String email = this.jwtTokenHelper.extractUsername(principal.getName());
        return new ResponseEntity<>(this.userService.convertUserToUserResponse(this.userService.findByEmail(email)),HttpStatus.OK);
    }
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER','ROLE_TRAINER')")
    @PutMapping("/user/profile/update")
    public ResponseEntity<Boolean> updateUserProfile(@Valid @RequestBody UpdateProfileRequest userRequest,
                                                          @RequestParam(required = true) int id ,
                                                          Principal principal){
        String email = this.jwtTokenHelper.extractUsername(principal.getName());
        if(id>0){

            this.userService.updateUser(userRequest,id,email);
            return new ResponseEntity<>(true,HttpStatus.OK);

        }
        throw new MethodArgumentsNotFound("User id for update is not given.");
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/user/details-id")
    public ResponseEntity<UserResponse> getUserDetailsById(@RequestParam(required = true) Integer id){
        if(id>0){
            return new ResponseEntity<>(this.userService.convertUserToUserResponse(this.userService.findByUserId(id)),HttpStatus.OK);
        }else{
            throw new MethodArgumentsNotFound("User Id Not Given .");
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/user/is-active-or-deactive")
    public ResponseEntity<String> isUserActiveOrDeactive(@RequestParam(required = true) Integer id){
        if(id>0){
            return new ResponseEntity<>(this.userService.isUserActiveOrDeactive(id),HttpStatus.OK);
        }else{
            throw new MethodArgumentsNotFound("User Id Not Given .");
        }
    }

}
