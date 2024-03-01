package com.spriing.parmesanar.service;
import com.spriing.parmesanar.entity.User;
import com.spriing.parmesanar.pojo.UserPojo;

import java.util.List;
import java.util.Optional;

public interface UserService {

    void saveUser(UserPojo userPojo);

    List<User> getAllData();

    Optional<User> getById(Integer id);

    void deleteById(Integer id);

    Optional<User> getUserByEmail(String email);
}


