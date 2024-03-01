package com.spriing.parmesanar.pojo;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class BookPojo {

    private Long id;

    @NotEmpty(message = "Title must not be empty")
    private String title;

    @NotEmpty
    private String author;

    @NotEmpty
    private String genre;

    @NotNull
    private Integer publicationYear;

    @NotEmpty
    private String publisher;

    @NotNull
    private Integer pages;

    @NotEmpty
    private String synopsis;

    @NotNull
    private Double price;

    @NotNull
    private MultipartFile bookImage;



}
