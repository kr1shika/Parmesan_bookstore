package com.spriing.parmesanar.Controller;
import com.spriing.parmesanar.entity.Cart;
import com.spriing.parmesanar.pojo.CartPojo;
import com.spriing.parmesanar.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/cart")
@RestController
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @PostMapping("/save")
    public String saveCart(@Valid @RequestBody CartPojo cartPojo){
        cartService.saveCart(cartPojo);
        return "data created successfully yoh cart-item";
    }

    @GetMapping("/getById/{id}")
    public Optional<Cart> findById(@PathVariable("id") Integer id){
        return cartService.findById(id);
    }


}
