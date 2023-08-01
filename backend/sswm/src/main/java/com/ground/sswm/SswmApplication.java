package com.ground.sswm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SswmApplication {

    public static void main(String[] args) {
        SpringApplication.run(SswmApplication.class, args);
    }

}
