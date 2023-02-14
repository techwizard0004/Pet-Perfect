package io.petperfect.backend.service;

import io.petperfect.backend.entity.Role;
import io.petperfect.backend.repository.RoleRepo;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService implements  RoleInterface{

    private static final Logger LOGGER = LogManager.getLogger(RoleService.class);
    @Autowired
    private RoleRepo roleRepo;

    public List<Role> findAllRoles() {
        return roleRepo.findAll();
    }

    @Override
    public String findRoleNameById(int id) {
        if(id==0) {
            //throw new MethodArgumentsNotFound("Id", "findRoleNameById", id);
            LOGGER.warn("Method Arguments ot Found");
        }
        return this.roleRepo.findNameById(id);
    }

    @Override
    public int findRoleIdByName(String name) {
        if(name==null) {
            //throw new MethodArgumentsNotFound("Name field id null at findRoleIdByName");
            LOGGER.warn("Method Arguments ot Found");
        }
        return this.roleRepo.findByName(name).getId();
    }

    @Override
    public Role findRoleByName(String name) {
        if(name==null) {
           // throw new MethodArgumentsNotFound("Name filed is null at findRoleByName");
            LOGGER.warn("Method Arguments ot Found");
        }
        return this.roleRepo.findByName(name);
    }

    public void saveRole(Role role) {
        if(role==null) {
            //throw new MethodArgumentsNotFound("Role", "saveRole", role);
            LOGGER.warn("Method Arguments ot Found");
            return;
        }
        this.roleRepo.save(role);
    }
}
