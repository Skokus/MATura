package com.example.demo.tasks;

import com.example.demo.theorycards.TheoryCard;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Tasks Controller")
@RequestMapping(value = "/api/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @RequestMapping(value = "", method = RequestMethod.POST)
    @Operation(summary = "Save task")
    public ResponseEntity<Task> saveTask(@RequestBody Task t){
        return new ResponseEntity<>(taskService.saveTask(t), HttpStatus.CREATED);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    @Operation(summary = "Get all tasks")
    public ResponseEntity<List<Task>> getAllTasks(){
        return new ResponseEntity<>(taskService.getAllTasks(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @Operation(summary = "Get task by id")
    public ResponseEntity<Task> getTaskById(@PathVariable String id){
        return new ResponseEntity<>(taskService.getTaskById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @Operation(summary = "Edit task")
    public ResponseEntity<Task> editTask(@PathVariable String id, @RequestBody Task t){
        return new ResponseEntity<>(taskService.editTask(t,id), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @Operation(summary = "Remove task by id")
    public ResponseEntity removeTask(@PathVariable String id){
        taskService.removeTask(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
