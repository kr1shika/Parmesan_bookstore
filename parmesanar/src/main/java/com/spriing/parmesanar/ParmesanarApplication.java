package com.spriing.parmesanar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@ComponentScan(basePackages = "com.spriing.parmesanar")
public class ParmesanarApplication {

    public static void main(String[] args) {
        SpringApplication.run(ParmesanarApplication.class, args);

    }

}
