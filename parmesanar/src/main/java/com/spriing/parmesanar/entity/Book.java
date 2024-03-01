package com.spriing.parmesanar.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.management.relation.Role;
import java.util.Collection;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
@Entity
@Getter
@Setter
@Table(name = "Book")
public class Book {

    @Id
    @SequenceGenerator(name = "book_seq_gen", sequenceName = "book_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "book_seq_gen", strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "author")
    private String authors;

    @Column(name = "genre", nullable = false)
    private String genre;

    @Column(name = "publication_year", nullable = false)
    private Integer publicationYear;

    @Column(name = "publisher", nullable = false)
    private String publisher;

    @Column(name = "pages", nullable = false)
    private Integer pages;

    @Column(name = "synopsis", nullable = false, length = 20000)
    private String synopsis;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "bookImage")
    private String bookImage;


    public String getBookImage() {
        return bookImage; // Ensure that this is not null
    }
}


