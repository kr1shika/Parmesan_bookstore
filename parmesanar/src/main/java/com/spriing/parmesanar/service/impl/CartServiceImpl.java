package com.spriing.parmesanar.service.impl;

import com.spriing.parmesanar.entity.Book;
import com.spriing.parmesanar.entity.Cart;
import com.spriing.parmesanar.entity.User;
import com.spriing.parmesanar.pojo.CartPojo;
import com.spriing.parmesanar.repository.BookRepository;
import com.spriing.parmesanar.repository.CartRepository;
import com.spriing.parmesanar.repository.UserRepository;
import com.spriing.parmesanar.service.CartService;
import com.spriing.parmesanar.util.ImageToBase64;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final BookRepository bookRepository;
    private  final UserRepository userRepository;
    private final String UPLOAD_DIRECTORY = new StringBuilder().append(System.getProperty("user.dir")).append("/Book_cover/IMGS").toString();
    ImageToBase64 imageToBase64 = new ImageToBase64();
    @Override
    public void saveCart(CartPojo cartPojo) {
        Cart cart = new Cart();
        if(cartPojo.getId()!=null){
            cart=cartRepository.findById(cartPojo.getId())
                    .orElseThrow(()-> new NoSuchElementException("No data found"));
        }
        User user = userRepository.findById(cartPojo.getUserId()).get();

        Book book = bookRepository.findById(Long.valueOf(cartPojo.getBookId())).get();
        cart.setBook(book);
        cart.setUser(user);
        cartRepository.save(cart);
    }



    @Override
    public List<Cart> findByUserId(Integer userId){
        List<Cart> cartList= cartRepository.findByUserId(userId);
        return cartRepository.findAll().stream().map(book -> {
            book.setBookImage(imageToBase64.getImageBase64("/IMGS/" + book.getBook().getBookImage()));
            return book;
        }).collect(Collectors.toList());
    }

    @Override
    public Optional<Cart> findById(Integer id) {
        return cartRepository.findById(id);
    }



    @Override

    public void deleteById(Integer id) {
        cartRepository.deleteById(id);
    }

}
