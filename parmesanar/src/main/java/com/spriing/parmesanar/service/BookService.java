package com.spriing.parmesanar.service;

import com.spriing.parmesanar.entity.Book;
import com.spriing.parmesanar.pojo.BookPojo;
import jakarta.transaction.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Transactional
public interface BookService {

    List<Book> searchByName(String title );


    List<Book> findAll();

    Optional<Book> getBookById(Long id);

    void deleteById(Long id);

    void saveBook(BookPojo bookPojo) throws IOException;

//    public Book updateBook(Long id, Book updatedBook);

    Book updateBook(Long id, BookPojo updatedBookPojo) throws IOException;

//    void saveBook(BookPojo bookPojo, MultipartFile bookImage) throws IOException;
}
