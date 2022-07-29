package com.example.demo.controllers;

import com.example.demo.dto.CategoryDto;
import com.example.demo.models.Category;
import com.example.demo.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping("/categories")
    public String saveCategory(@RequestBody CategoryDto categoryDto){
        Category category = new Category(categoryDto.getName());
        System.out.println(category.getName());
        categoryRepository.save(category);
        return "Added new category: " + category;
    }

    @GetMapping("/categories")
    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    @GetMapping("/categories/{id}")
    public Optional<Category> getCategoryById(@PathVariable String id){
        return categoryRepository.findById(id);
    }
}
