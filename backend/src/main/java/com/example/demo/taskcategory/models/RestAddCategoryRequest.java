package com.example.demo.taskcategory.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter @Setter
public class RestAddCategoryRequest {
    private String name;
}
