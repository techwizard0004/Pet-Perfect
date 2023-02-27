package io.petperfect.backend.payloads;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UpdateProfileRequest {

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

    private String shopName;

    private String licenceNo;
}
