package com.example.demo.category.exceptions;

public class TaskDoesNotExistException extends RuntimeException {
    public TaskDoesNotExistException(String message) {
        super(message);
    }
}
