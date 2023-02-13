package io.petperfect.backend;

import io.petperfect.backend.entity.Role;
import io.petperfect.backend.entity.UserEntity;
import io.petperfect.backend.repository.UserRepo;
import io.petperfect.backend.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;
import java.util.Set;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {
	@Autowired
	private RoleService roleService;
	@Autowired private UserRepo userRepository;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		List<Role> roles = this.roleService.findAllRoles();
		if(roles.isEmpty()){
			Role role = new Role();
			role.setName("ROLE_ADMIN");
			this.roleService.saveRole(role);

			Role role1 = new Role();
			role1.setName("ROLE_USER");
			this.roleService.saveRole(role1);
		}


	}
}
