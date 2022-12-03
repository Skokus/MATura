package com.example.demo.users.userprogress;

import com.example.demo.taskcategory.models.Category;
import com.example.demo.tasks.Task;
import lombok.Data;

import java.util.*;
import java.util.function.BiConsumer;

@Data
public class CategoryProgress {
    private Map<String, Boolean> categoryAnswers;
    private String name;
    public CategoryProgress(){

    }

    public CategoryProgress(Category category){
        Map<String, Boolean> answers = new HashMap<>();
        for(String t : category.getTasks()){
            answers.put(t, false);
        }
        this.categoryAnswers = answers;
        this.name = category.getName();
    }

    public void addTask(String id){
        categoryAnswers.put(id, false);
    }

    public void markTaskAsDone(String id){
        categoryAnswers.replace(id, true);
    }

    public int getNumberOfTasks(){
        return categoryAnswers.size();
    }

    public void setCategoryAnswers(Map<String, Boolean> categoryAnswers){
        this.categoryAnswers = categoryAnswers;
    }

    public Map<String, Boolean> getCategoryAnswers(){
        return this.categoryAnswers;
    }

    public String getName(){
        return this.name;
    }

    @Override
    public String toString(){
        return "Progress of category: " + this.name;
    }
}
