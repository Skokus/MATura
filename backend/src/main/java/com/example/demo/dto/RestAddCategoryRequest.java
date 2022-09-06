package com.example.demo.dto;

public class RestAddCategoryRequest {
    private String name;

    public RestAddCategoryRequest() {

    }

    public RestAddCategoryRequest(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
