package com.spriing.parmesanar.service;

import com.spriing.parmesanar.entity.Book;
import com.spriing.parmesanar.entity.Cart;
import com.spriing.parmesanar.pojo.CartPojo;
import java.util.List;
import java.util.Optional;

public interface CartService {

    void saveCart(CartPojo cartPojo);





    List<Cart> findByUserId(Integer userId);

    Optional<Cart> findById(Integer id);



    void deleteById(Integer id);



}
