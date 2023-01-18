package com.example.demo.users.userprogress;

import com.example.demo.category.models.Category;
import lombok.Data;

import java.util.*;

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

    public void removeTask(String id){
        categoryAnswers.remove(id, false);
    }

    public void markTaskAsDone(String id){
        categoryAnswers.replace(id, true);
    }

    public int getNumberOfTasks(){
        return categoryAnswers.size();
    }

    public int getNumberOfDoneTasks(){
        int i = 0;
        for(Boolean b : categoryAnswers.values()){
            if(b) {
                i++;
            }
        }
        return i;
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
