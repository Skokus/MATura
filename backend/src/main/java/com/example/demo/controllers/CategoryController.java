package com.example.demo.controllers;

import com.example.demo.dto.CategoryDto;
import com.example.demo.models.Category;
import com.example.demo.models.Task;
import com.example.demo.repositories.CategoryRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@Tag(name="CategoriesController")
@RequestMapping(value = "/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @RequestMapping (value = "", method = RequestMethod.POST)
    @Operation(summary = "Save category")
    public ResponseEntity<Category> saveCategory(@RequestBody CategoryDto categoryDto){
        return new ResponseEntity<>(categoryRepository.save(new Category(categoryDto.getName())), HttpStatus.CREATED);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    @Operation(summary = "Get all categories")
    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @Operation(summary = "Get category by id")
    public Optional<Category> getCategoryById(@PathVariable String id){
        return categoryRepository.findById(id);
    }

    @RequestMapping(value = "/names/{name}", method = RequestMethod.GET)
    @Operation(summary = "Get category by name")
    public Category getCategoryByName(@PathVariable String name){
        return categoryRepository.findByName(name);
    }

    @RequestMapping(value = "/names", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    @Operation(summary = "Get categories' names")
    public List<String> getCategoryNames(){
        List<Category> categories = categoryRepository.findAll();
        List<String> names = new ArrayList<>();
        for(Category c : categories){
            names.add(c.getName());
        }
        return names;
    }

    @RequestMapping(value = "/{name}/numberOfTasks", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    @Operation(summary = "Get number of tasks in category")
    public int getNumberOfTasks(@PathVariable String name){
        Category c = categoryRepository.findByName(name);
        if(c != null){
            return c.getTasks().size();
        }
        return 0;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @Operation(summary = "Delete category")
    public ResponseEntity<?> deleteCategory(@PathVariable String id){
        categoryRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/{categoryName}", method = RequestMethod.POST)
    @Operation(summary = "Save task in category", responses={
            @ApiResponse(description = "Task saved in category", responseCode = "201")
    })
    public ResponseEntity<Category> saveTask(@RequestBody Task task, @PathVariable String categoryName){
        Category c = categoryRepository.findByName(categoryName);
        return new ResponseEntity<>(categoryRepository.save(c), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{categoryName}/{id}", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    @Operation(summary = "Get task by placement in category")
    public Task getTaskByNumberInCategory(@PathVariable String categoryName, @PathVariable int id){
        Category c = categoryRepository.findByName(categoryName);
        return c.getTasks().get(id);
    }
}
