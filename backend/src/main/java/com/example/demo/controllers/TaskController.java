package com.example.demo.controllers;

import com.example.demo.dto.CategoryDto;
import com.example.demo.models.Category;
import com.example.demo.models.Task;
import com.example.demo.repositories.CategoryRepository;
import com.example.demo.repositories.TaskRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@Tag(name="TaskController")
@RequestMapping(value = "/tasks")
public class TaskController {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private TaskRepository taskRepository;
    @RequestMapping(value = "/{categoryName}", method = RequestMethod.POST)
    @Operation(summary = "Save task in category", responses={
            @ApiResponse(description = "Task saved in category", responseCode = "201")
    })
    public ResponseEntity<Category> saveTask(@RequestBody Task task, @PathVariable String categoryName){
        Category c = categoryRepository.findByName(categoryName);
        Task t = taskRepository.save(task);
        c.getTasks().add(t);
        return new ResponseEntity<>(categoryRepository.save(c), HttpStatus.CREATED);
    }
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @Operation(summary = "Get task by Id")
    public Optional<Task> getTaskById(@PathVariable String id){
        return taskRepository.findById(id);
    }
    @RequestMapping(value = "/{categoryName}/{id}", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    @Operation(summary = "Get task by placement in category")
    public Task getTaskByNumberInCategory(@PathVariable String categoryName, @PathVariable int id){
        Category c = categoryRepository.findByName(categoryName);
        return c.getTasks().get(id);
    }
}
