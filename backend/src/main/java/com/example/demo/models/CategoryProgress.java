package com.example.demo.models;

import lombok.Data;

import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

@Data
public class CategoryProgress {
    private HashMap<String, Boolean> categoryAnswers;
    private String name;
    public CategoryProgress(){

    }

    public CategoryProgress(Category category){
        HashMap<String, Boolean> answers = new LinkedHashMap<>();
        for(Task t : category.getTasks()){
            answers.put(t.getId(), false);
        }
        this.categoryAnswers = answers;
        this.name = category.getName();
    }

    public void markTaskAsDone(String id){
        categoryAnswers.replace(id, true);
    }

    public int getNumberOfDoneTasks(){
        int sum = 0;
        for(Boolean b : categoryAnswers.values()){
            if(b){
                sum++;
            }
        }
        return sum;
    }

    public void setCategoryAnswers(HashMap<String, Boolean> categoryAnswers){
        this.categoryAnswers = categoryAnswers;
    }

    public HashMap<String, Boolean> getCategoryAnswers(){
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
