package com.example.demo.controllers;

import com.example.demo.dto.CategoryDto;
import com.example.demo.models.Category;
import com.example.demo.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @RequestMapping (value = "", method = RequestMethod.POST)
    public ResponseEntity<Category> saveCategory(@RequestBody CategoryDto categoryDto){
        return new ResponseEntity<>(categoryRepository.save(new Category(categoryDto.getName())), HttpStatus.CREATED);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Optional<Category> getCategoryById(@PathVariable String id){
        return categoryRepository.findById(id);
    }

    @RequestMapping(value = "/names/{name}", method = RequestMethod.GET)
    public Category getCategoryByName(@PathVariable String name){
        return categoryRepository.findByName(name);
    }

    @RequestMapping(value = "/names", method = RequestMethod.GET)
    public List<String> getCategoryNames(){
        List<Category> categories = categoryRepository.findAll();
        List<String> names = new ArrayList<String>();
        for(Category c : categories){
            names.add(c.getName());
        }
        return names;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteCategory(@PathVariable String id){
        categoryRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
