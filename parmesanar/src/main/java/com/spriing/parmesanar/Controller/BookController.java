package com.spriing.parmesanar.Controller;
import com.spriing.parmesanar.entity.Book;
import com.spriing.parmesanar.pojo.BookPojo;
import com.spriing.parmesanar.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @GetMapping("/searchByName/{title}")
    public List<Book> searchByName(@PathVariable("title") String title) {
        return bookService.searchByName(title);
    }

    @PostMapping("/saveBook")
    public ResponseEntity<String> saveBook( @Valid @RequestBody @ModelAttribute BookPojo bookPojo) {
        try {
            // Set other attributes of the book entity from bookPojo
            bookService.saveBook(bookPojo);  // Pass the book entity to the service
            return ResponseEntity.ok("Book added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save data");
        }
    }

    @GetMapping("/getAll")
    public List<Book> findAll() {
        List<Book> books = bookService.findAll();

        // Print the data to the console
        for (Book book : books) {
            System.out.println("Book data: " + book);
        }

        return books;
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody BookPojo updatedBookPojo) {
        try {
            Book updatedBook = bookService.updateBook(id, updatedBookPojo);
            return new ResponseEntity<>(updatedBook, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (IOException ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getBookById/{id}")
    public ResponseEntity<Optional<Book>> getBookById(@PathVariable("id") Long id) {
        try {
            Optional<Book> book = bookService.getBookById(id);

            if (book.isPresent()) {
                return ResponseEntity.ok(book);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }



    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<String> deleteById(@PathVariable("id") Long id){
        try {
            bookService.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Data deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete data");
        }
    }


}
