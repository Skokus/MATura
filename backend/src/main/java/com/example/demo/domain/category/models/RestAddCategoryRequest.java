package com.example.demo.domain.category.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter @Setter
public class RestAddCategoryRequest {
    private String name;
}
