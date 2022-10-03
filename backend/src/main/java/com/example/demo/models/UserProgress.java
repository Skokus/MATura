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

    public void markTaskAsDone(Integer idx, String categoryName){
        userProgress.stream().filter(c -> c.getName().equals(categoryName)).findFirst().get().markTaskAsDone(idx);
    }

    public CategoryProgress getCategoryProgress(String name){
        CategoryProgress p = userProgress.stream().filter(e -> e.getName().equals(name)).findFirst().get();
        return p;
    }

    public List<Integer> getNumberOfDoneTasks(){
        ArrayList<Integer> result = new ArrayList<>();
        for(CategoryProgress u : userProgress){
            result.add(u.getNumberOfDoneTasks());
        }
        return result;
    }

}
