package com.example.demo.models;

import lombok.Data;

import java.util.*;

@Data
public class UserProgress {
    List<CategoryProgress> userProgress;

    public UserProgress(){

    }

    public UserProgress(Collection<Category> categories){
        this.userProgress = new ArrayList<>();
        for(Category c : categories){
            CategoryProgress categoryProgress = new CategoryProgress(c);
            this.userProgress.add(categoryProgress);
        }
    }

    public void markTaskAsDone(String id, String categoryName){
        userProgress.stream().filter(c -> c.getName().equals(categoryName)).findFirst().get().markTaskAsDone(id);
    }

    public List<Integer> getNumberOfDoneTasks(){
        ArrayList<Integer> result = new ArrayList<>();
        for(CategoryProgress u : userProgress){
            result.add(u.getNumberOfDoneTasks());
        }
        return result;
    }

}
