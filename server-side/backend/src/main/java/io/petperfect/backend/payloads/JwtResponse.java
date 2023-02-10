package io.petperfect.backend.payloads;

import io.petperfect.backend.entity.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class JwtResponse {

    private String token;
    private int userId;
    private List<Role> role;
    private boolean isAuthenticated = false;
}
