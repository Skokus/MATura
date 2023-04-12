package com.example.demo.domain.category.models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Document(collection = "category")
@ToString
@Data
@Getter @Setter
public class Category {
    @Id
    private String id;
    private String name;
    private Set<String> tasks;

    public Category(String name){
        this.name = name;
        this.tasks = new HashSet<>();
    }

    public void addTask(String id){
        tasks.add(id);
    }

    public void removeTask(String id){
        tasks.remove(id);
    }
}
