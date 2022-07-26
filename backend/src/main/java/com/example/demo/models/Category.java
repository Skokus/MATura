package com.example.demo.models;

import org.springframework.data.annotation.Id;

import java.util.List;

public class Category {
    @Id
    private String id;
    private String name;
    private List<Task> tasks;
}
