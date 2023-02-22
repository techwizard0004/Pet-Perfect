package io.petperfect.backend.service;

import io.petperfect.backend.entity.Role;

public interface RoleInterface {
    String findRoleNameById(int id);
    int findRoleIdByName(String name);
    Role findRoleByName(String name);
}
