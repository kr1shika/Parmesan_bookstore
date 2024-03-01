package com.spriing.parmesanar.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "Cart")
public class Cart {
    @Id
    @SequenceGenerator(name = "cart_item_seq_gen", sequenceName = "cart_item_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "cart_item_seq_gen", strategy = GenerationType.SEQUENCE)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;


    private String bookImage;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
