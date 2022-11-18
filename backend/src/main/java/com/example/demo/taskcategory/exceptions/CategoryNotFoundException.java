package com.example.demo.taskcategory.exceptions;

import org.webjars.NotFoundException;

public class CategoryNotFoundException extends NotFoundException {
    public CategoryNotFoundException(String message) {
        super(message);
    }
}
