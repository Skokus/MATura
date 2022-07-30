package com.example.demo.controllers;

import com.example.demo.dto.CategoryDto;
import com.example.demo.models.Category;
import com.example.demo.models.Task;
import com.example.demo.repositories.CategoryRepository;
import com.example.demo.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class TaskController {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private TaskRepository taskRepository;

    @RequestMapping(value = "/categories/{categoryName}", method = RequestMethod.POST)
    public ResponseEntity<Category> saveTask(@RequestBody Task task, @PathVariable String categoryName){
        Category c = categoryRepository.findByName(categoryName);
        Task t = taskRepository.save(task);
        c.getTasks().add(t);
        return new ResponseEntity<>(categoryRepository.save(c), HttpStatus.CREATED);
    }
}
