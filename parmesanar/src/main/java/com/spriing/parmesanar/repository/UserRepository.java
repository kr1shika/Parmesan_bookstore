package com.spriing.parmesanar.repository;

import com.spriing.parmesanar.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    @Query(value = "Select * from users where user_name=?1",nativeQuery = true)
    Optional<User>  getUserByUserName(String username);

    Optional<User> findByEmail(String email);

}
