package com.spriing.parmesanar.pojo;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserPojo {
    private Integer id;

    @NotNull
    private String userName;

    @NotNull
    private String password;

    @NotNull
    private String address;

//    @NotBlank(message = "Email cannot be blank")
//    @Email(message = "Invalid email format")
//    private String email;

    @NotNull
    private String email;

    // Other fields with validation annotations...

}
