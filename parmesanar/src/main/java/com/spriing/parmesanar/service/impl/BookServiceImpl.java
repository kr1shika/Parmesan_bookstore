package com.spriing.parmesanar.service.impl;
import com.spriing.parmesanar.entity.Book;
import com.spriing.parmesanar.repository.BookRepository;
import com.spriing.parmesanar.service.BookService;
import com.spriing.parmesanar.util.ImageToBase64;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.spriing.parmesanar.pojo.BookPojo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.NoSuchElementException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final String UPLOAD_DIRECTORY = new StringBuilder().append(System.getProperty("user.dir")).append("/Book_cover/IMGS").toString();
    ImageToBase64 imageToBase64 = new ImageToBase64();
    @Override
    public void saveBook(BookPojo bookPojo) throws IOException {
        Book newBook;
        if (bookPojo.getId() != null) {
            newBook = bookRepository.findById(bookPojo.getId())
                    .orElseThrow(() -> new NoSuchElementException("No data found"));
        } else {
            newBook = new Book();
        }
        newBook.setTitle(bookPojo.getTitle());
        newBook.setPages(bookPojo.getPages());
        newBook.setGenre(bookPojo.getGenre());
        newBook.setPrice(bookPojo.getPrice());
        newBook.setPublisher(bookPojo.getPublisher());
        newBook.setPublicationYear(bookPojo.getPublicationYear());
        newBook.setSynopsis(bookPojo.getSynopsis());
        newBook.setAuthors(bookPojo.getAuthor());
        if (bookPojo.getBookImage() != null ) {
            StringBuilder fileNames = new StringBuilder();
            Path fileNameAndPath = (Path) Paths.get(UPLOAD_DIRECTORY, bookPojo.getBookImage().getOriginalFilename());
            fileNames.append(bookPojo.getBookImage().getOriginalFilename());
            Files.write(fileNameAndPath, bookPojo.getBookImage().getBytes());

        }
        newBook.setBookImage(bookPojo.getBookImage().getOriginalFilename());
        bookRepository.save(newBook);
    }

    @Override
    public List<Book> searchByName( String title) {
        List<Book> books= bookRepository.findByTitleIgnoreCase(title);
        books =books.stream().map(book -> {
            book.setBookImage(imageToBase64.getImageBase64("/IMGS/" + book.getBookImage()));
            return book;
        }).collect(Collectors.toList());
        return books;
    }

    @Override
    public List<Book> findAll() {
        List<Book> books = bookRepository.findAll();
        books = books.stream().map(book -> {
            book.setBookImage(imageToBase64.getImageBase64("/IMGS/" + book.getBookImage()));
            return book;
        }).collect(Collectors.toList());
        return books;
    }
    @Override
    public Optional<Book> getBookById(Long id) {
        Optional<Book> optionalBook = bookRepository.findById(id);

        optionalBook.ifPresent(book -> {
            book.setBookImage(imageToBase64.getImageBase64("/IMGS/" + book.getBookImage()));
        });

        return optionalBook;
    }


    @Override
    public void deleteById(Long id) {
        bookRepository.deleteById(id);
    }


    @Override
    public Book updateBook(Long id, BookPojo updatedBookPojo) throws IOException {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Book not found with id: " + id));

        updateBookProperties(book, updatedBookPojo);
        return bookRepository.save(book);
    }

    private void updateBookProperties(Book book, BookPojo updatedBookPojo) throws IOException {
        book.setTitle(updatedBookPojo.getTitle());
        book.setPages(updatedBookPojo.getPages());
        book.setGenre(updatedBookPojo.getGenre());
        book.setPrice(updatedBookPojo.getPrice());
        book.setPublisher(updatedBookPojo.getPublisher());
        book.setPublicationYear(updatedBookPojo.getPublicationYear());
        book.setSynopsis(updatedBookPojo.getSynopsis());
        book.setAuthors(updatedBookPojo.getAuthor());

        if (updatedBookPojo.getBookImage() != null && !updatedBookPojo.getBookImage().isEmpty()) {
            MultipartFile newImage = updatedBookPojo.getBookImage();

            StringBuilder fileNames = new StringBuilder();
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, newImage.getOriginalFilename());
            fileNames.append(newImage.getOriginalFilename());

            Files.write(fileNameAndPath, newImage.getBytes());
            book.setBookImage(newImage.getOriginalFilename());
        }
    }
}


