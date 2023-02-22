package io.petperfect.backend.repository;

import io.petperfect.backend.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepo  extends JpaRepository<Role, Integer> {

    Role findByName(String name);

    String findNameById(int id);


}
