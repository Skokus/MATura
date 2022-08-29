package com.example.demo;

import com.example.demo.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	@Autowired
	CategoryService categoryService;
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
}
