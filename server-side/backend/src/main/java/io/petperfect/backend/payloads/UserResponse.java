package io.petperfect.backend.payloads;

import io.petperfect.backend.entity.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UserResponse {

    private int userId;

    private String name;

    private String email;

    private String contact;

    private String address;

    private int age;

    private String shopName;

    private String licenceNo;

    private List<Role> role;

}
