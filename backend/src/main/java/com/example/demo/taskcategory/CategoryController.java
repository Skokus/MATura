package com.example.demo.taskcategory;

import com.example.demo.taskcategory.models.Category;
import com.example.demo.taskcategory.models.RestAddCategoryRequest;
import com.example.demo.taskcategory.models.RestAddTaskRequest;
import com.example.demo.taskcategory.exceptions.CategoryNotFoundException;
import com.example.demo.taskcategory.exceptions.TaskDoesNotExistException;
import com.example.demo.taskcategory.models.Task;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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

    @RequestMapping(value = "/{name}/numberOfTasks", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    @Operation(summary = "Get number of tasks in category")
    public ResponseEntity<Integer> getNumberOfTasks(@PathVariable String name) {
        int n = categoryService.getNumberOfTasks(name);
        return new ResponseEntity<>(n, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @Operation(summary = "Delete category")
    public ResponseEntity<Category> deleteCategory(@PathVariable String id) {
        Category c = categoryService.deleteCategory(id);
        return new ResponseEntity<>(c, HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/{categoryName}", method = RequestMethod.POST)
    @Operation(summary = "Save task in category", responses = {
            @ApiResponse(description = "Task saved in category", responseCode = "201")
    })
    public ResponseEntity<Task> saveTask(@RequestBody RestAddTaskRequest task, @PathVariable String categoryName) {
        Task t = addTaskRequestToTask(task);
        categoryService.addTaskToCategory(t, categoryName);
        return new ResponseEntity<>(t, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{categoryName}/{index}", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    @Operation(summary = "Get task by placement in category")
    public ResponseEntity<Task> getTaskByNumberInCategory(@PathVariable String categoryName, @PathVariable int index) {
        Task t = categoryService.getTaskByPlaceInCategory(categoryName, index);
        return new ResponseEntity<>(t, HttpStatus.OK);
    }

    @RequestMapping(value = "/{categoryName}/{id}", method = RequestMethod.DELETE)
    @Operation(summary = "Delete task by id")
    public ResponseEntity<Void> deleteTaskById(@PathVariable String categoryName, @PathVariable String id) {
        try {
            categoryService.removeTaskFromCategory(id, categoryName);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (CategoryNotFoundException | TaskDoesNotExistException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    private Task addTaskRequestToTask(RestAddTaskRequest request) {
        return Task.builder()
                .question(request.getQuestion())
                .steps(request.getSteps())
                .tips(request.getTips())
                .build();
    }
}
