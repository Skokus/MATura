package com.example.demo.models;

import lombok.Data;

import java.util.*;

@Data
public class CategoryProgress {
    private List<Boolean> categoryAnswers;
    private String name;
    public CategoryProgress(){

    }

    public CategoryProgress(Category category){
        List<Boolean> answers = new ArrayList<>();
        for(int i = 0; i < category.getTasks().size(); i++){
            answers.add(false);
        }
        this.categoryAnswers = answers;
        this.name = category.getName();
    }

    public void markTaskAsDone(Integer idx){
        categoryAnswers.set(idx, true);
    }

    public int getNumberOfDoneTasks(){
        int sum = 0;
        for(Boolean b : categoryAnswers){
            if(b){
                sum++;
            }
        }
        return sum;
    }

    public int getNumberOfTasks(){
        return categoryAnswers.size();
    }

    public void setCategoryAnswers(List<Boolean> categoryAnswers){
        this.categoryAnswers = categoryAnswers;
    }

    public List<Boolean> getCategoryAnswers(){
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
