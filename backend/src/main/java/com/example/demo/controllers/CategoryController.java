package com.example.demo.controllers;

import com.example.demo.dto.CategoryDto;
import com.example.demo.models.Category;
import com.example.demo.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @RequestMapping (value = "/categories", method = RequestMethod.POST)
    public ResponseEntity<Category> saveCategory(@RequestBody CategoryDto categoryDto){
        return new ResponseEntity<>(categoryRepository.save(new Category(categoryDto.getName())), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/categories", method = RequestMethod.GET)
    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    @RequestMapping(value = "/categories/{id}", method = RequestMethod.GET)
    public Optional<Category> getCategoryById(@PathVariable String id){
        return categoryRepository.findById(id);
    }

    @RequestMapping(value = "/categories/name/{name}", method = RequestMethod.GET)
    public Category getCategoryByName(@PathVariable String name){
        return categoryRepository.findByName(name);
    }

    @RequestMapping(value = "/categories/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteCategory(@PathVariable String id){
        categoryRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
