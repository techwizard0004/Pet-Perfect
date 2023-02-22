package io.petperfect.backend;

import io.petperfect.backend.entity.Role;
import io.petperfect.backend.repository.UserRepo;
import io.petperfect.backend.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class BackendApplication{
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
