package com.example.demo.taskcategory.exceptions;

public class TaskDoesNotExistException extends RuntimeException {
    public TaskDoesNotExistException(String message) {
        super(message);
    }
}
