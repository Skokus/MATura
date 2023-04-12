package com.example.demo.domain.category.exceptions;

import org.webjars.NotFoundException;

public class CategoryNotFoundException extends NotFoundException {
    public CategoryNotFoundException(String message) {
        super(message);
    }
}
