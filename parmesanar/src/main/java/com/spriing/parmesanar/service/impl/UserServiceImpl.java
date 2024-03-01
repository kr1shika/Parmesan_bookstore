package com.spriing.parmesanar.service.impl;

import com.spriing.parmesanar.config.PasswordEncoderUtil;
import com.spriing.parmesanar.entity.User;
import com.spriing.parmesanar.pojo.UserPojo;
import com.spriing.parmesanar.repository.UserRepository;
import com.spriing.parmesanar.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    @Override
    public void saveUser(UserPojo userPojo) {

        User user = new User();

        if(userPojo.getId()!=null){
            user=userRepository.findById(userPojo.getId())
                    .orElseThrow(()-> new NoSuchElementException("No data found"));
        }

        user.setUserName(userPojo.getUserName());
        user.setPassword(PasswordEncoderUtil.getInstance().encode(userPojo.getPassword()));
        user.setAddress(userPojo.getAddress());
        user.setEmail(userPojo.getEmail());


        userRepository.save(user);
    }

    @Override
    public List<User> getAllData() {
        return userRepository.findAll(); // select * from users
    }

    @Override
    public Optional<User> getById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public void deleteById(Integer id) {
        userRepository.deleteById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        // Implementation for getting user by email
        return userRepository.findByEmail(email);
    }
}
