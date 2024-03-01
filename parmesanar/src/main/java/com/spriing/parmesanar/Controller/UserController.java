package com.spriing.parmesanar.Controller;
import com.spriing.parmesanar.entity.User;
import com.spriing.parmesanar.pojo.UserPojo;
import com.spriing.parmesanar.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RequestMapping("/user")
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/save")
    public ResponseEntity<String> saveUser(@Valid @RequestBody UserPojo userPojo, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // Handle validation errors
            return ResponseEntity.badRequest().body("Validation error: " + bindingResult.getAllErrors().get(0).getDefaultMessage());
        }

        try {
            userService.saveUser(userPojo);
            return ResponseEntity.ok("Data created successfully");
        } catch (Exception e) {
            // Handle other exceptions (e.g., database constraint violations)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving user data");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody UserPojo userPojo) {
        try {
            Optional<User> userOptional = userService.getUserByEmail(userPojo.getEmail());

            if (userOptional.isPresent()) {
                User user = userOptional.get();

                if (BCrypt.checkpw(userPojo.getPassword(), user.getPassword())) {
                    // Passwords match - login successful
                    Map<String, Object> response = new HashMap<>();
                    response.put("message", "Login successful. Welcome, " + user.getUserName() + "!");
                    response.put("userId", user.getId()); // Assuming User has a method getId()

                    return ResponseEntity.ok(response);
                } else {
                    // Passwords do not match - unauthorized
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("message", "Invalid credentials"));
                }
            } else {
                // User not found - unauthorized
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("message", "Invalid credentials"));
            }
        } catch (Exception e) {
            // Handle other exceptions (e.g., database errors)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("message", "Error during login"));
        }
    }



    @GetMapping("/getAll")
    public List<User> getAllData(){
        return userService.getAllData();
    }

    @GetMapping("/getById/{id}")
    public Optional<User> getDataBtId(@PathVariable("id") Integer id){
        return userService.getById(id);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id){
        userService.deleteById(id);
    }
}
