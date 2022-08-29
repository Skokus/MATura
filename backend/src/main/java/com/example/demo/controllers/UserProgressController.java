package com.example.demo.controllers;

import com.example.demo.models.Category;
import com.example.demo.models.UserProgress;
import com.example.demo.repositories.CategoryRepository;
import com.example.demo.repositories.UserProgressRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name="UserProgressController")
@RequestMapping(value = "/userprogress")

public class UserProgressController {

    @Autowired
    private UserProgressRepository userProgressRepository;

    @RequestMapping (value = "", method = RequestMethod.POST)
    @Operation(summary = "Create user's progress in database")
    public ResponseEntity<UserProgress> saveCategory(){
        return new ResponseEntity<>(userProgressRepository.save(new UserProgress()), HttpStatus.CREATED);
    }

    /*@RequestMapping (value = "{categoryName}/{id}", method = RequestMethod.PATCH)
    @Operation(summary = "Mark task as done")
    public ResponseEntity<> markTaskAsDone(@PathVariable String categoryName, @PathVariable String id){

    }*/
}
