package com.spriing.parmesanar.pojo;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartPojo {

    private Integer id;

    @NotNull
    private Integer userId;

    @NotNull
    private Integer bookId;



//    private String bookImage;

}
