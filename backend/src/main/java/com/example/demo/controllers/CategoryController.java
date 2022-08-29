package com.example.demo.controllers;

import com.example.demo.models.Category;
import com.example.demo.models.Task;
import com.example.demo.repositories.CategoryRepository;
import com.example.demo.services.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@Tag(name="CategoriesController")
@RequestMapping(value = "/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    @RequestMapping (value = "", method = RequestMethod.POST)
    @Operation(summary = "Save category")
    public ResponseEntity<Category> saveCategory(@RequestBody String categoryName){
        return new ResponseEntity<>(categoryService.saveCategory(categoryName), HttpStatus.CREATED);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    @Operation(summary = "Get all categories")
    public ResponseEntity<List<Category>> getAllCategories(){
        return new ResponseEntity<>(categoryService.getAllCategories(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @Operation(summary = "Get category by id")
    public ResponseEntity<Category> getCategoryById(@PathVariable String id){
        return new ResponseEntity<>(categoryService.getCategoryById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/names/{name}", method = RequestMethod.GET)
    @Operation(summary = "Get category by name")
    public ResponseEntity<Category> getCategoryByName(@PathVariable String name){
        return new ResponseEntity<>(categoryService.getCategoryByName(name), HttpStatus.OK);
    }

    @RequestMapping(value = "/names", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    @Operation(summary = "Get categories' names")
    public ResponseEntity<List<String>> getCategoryNames(){
        List<Category> categories = categoryService.getAllCategories();
        List<String> names = new ArrayList<>();
        for(Category c : categories){
            names.add(c.getName());
        }
        return new ResponseEntity<>(names, HttpStatus.OK);
    }

    @RequestMapping(value = "/{name}/numberOfTasks", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    @Operation(summary = "Get number of tasks in category")
    public ResponseEntity<Integer> getNumberOfTasks(@PathVariable String name){
        Category c = categoryService.getCategoryByName(name);
        return new ResponseEntity<>(c.getTasks().size(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @Operation(summary = "Delete category")
    public ResponseEntity<Category> deleteCategory(@PathVariable String id){
        Category c = categoryService.deleteCategory(id);
        return new ResponseEntity<>(c, HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/{categoryName}", method = RequestMethod.POST)
    @Operation(summary = "Save task in category", responses={
            @ApiResponse(description = "Task saved in category", responseCode = "201")
    })
    public ResponseEntity<Category> saveTask(@RequestBody Task task, @PathVariable String categoryName){
        Category c = categoryService.saveCategory(categoryName);
        return new ResponseEntity<>(c, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{categoryName}/{id}", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    @Operation(summary = "Get task by placement in category")
    public ResponseEntity<Task> getTaskByNumberInCategory(@PathVariable String categoryName, @PathVariable int id){
        Category c = categoryService.getCategoryByName(categoryName);
        return new ResponseEntity<>(c.getTasks().get(id), HttpStatus.OK);
    }
}
