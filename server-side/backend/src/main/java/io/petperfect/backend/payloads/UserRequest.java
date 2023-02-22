package io.petperfect.backend.payloads;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserRequest {

    @NotEmpty(message = "Name is required")
    @Size(min = 4, message = "UserName must be 4 char long.")
    private String name;

    @NotEmpty(message = "Email is required")
    @Pattern(regexp = "^[A-Za-z0-9+_.-]+@(.+)$", message = "Email is invalid")
    private String email;

    @NotEmpty(message = "Contact Details required")
    private String contact;

    private String address;

    private int age;

    @NotEmpty(message = "Password is required")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#%&_]).{8,15}$", message = "Password must be at least 8 characters long, contain at least one digit, one uppercase letter, one lowercase letter and one special character")
    private String password;

    private String shopName;

    private String licenceNo;

    private String role;

}
