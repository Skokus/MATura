package com.example.demo.taskcategory.models;

import com.example.demo.tasks.Task;
import lombok.Data;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "category")
@ToString
@Data
public class Category {
    @Id
    private String id;
    private String name;
    private List<String> tasks;

    public Category(){

    }
    
    public Category(String name){
        this.name = name;
        this.tasks = new ArrayList<>();
    }

    public void addTask(String id){
        tasks.add(id);
    }

    public void removeTask(String id){
        tasks.remove(id);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getTasks() {
        return tasks;
    }

    public void setTasks(List<String> tasks) {
        this.tasks = tasks;
    }
}
