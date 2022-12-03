package com.example.demo.taskcategory;

import com.example.demo.taskcategory.models.Category;
import com.example.demo.taskcategory.models.RestAddCategoryRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "CategoriesController")
@RequestMapping(value = "/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @RequestMapping(value = "", method = RequestMethod.POST)
    @Operation(summary = "Save category")
    public ResponseEntity<Category> saveCategory(@RequestBody RestAddCategoryRequest addCategoryRequest) {
        return new ResponseEntity<>(categoryService.saveCategory(addCategoryRequest.getName()), HttpStatus.CREATED);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    @Operation(summary = "Get all categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        return new ResponseEntity<>(categoryService.getAllCategories(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @Operation(summary = "Get category by id")
    public ResponseEntity<Category> getCategoryById(@PathVariable String id) {
        return new ResponseEntity<>(categoryService.getCategoryById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/names/{categoryName}", method = RequestMethod.GET)
    @Operation(summary = "Get category by name")
    public ResponseEntity<Category> getCategoryByName(@PathVariable String categoryName) {
        return new ResponseEntity<>(categoryService.getCategoryByName(categoryName), HttpStatus.OK);
    }

    @RequestMapping(value = "/names", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    @Operation(summary = "Get categories' names")
    public ResponseEntity<List<String>> getCategoryNames() {
        return new ResponseEntity<>(categoryService.getCategoryNames(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @Operation(summary = "Delete category")
    public ResponseEntity deleteCategory(@PathVariable String id) {
        categoryService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/{categoryName}/{id}", method = RequestMethod.POST)
    @Operation(summary = "Add task's id to category")
    public ResponseEntity<String> addTaskToCategory(@PathVariable String categoryName, @PathVariable String id){
        categoryService.addTaskToCategory(categoryName, id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
