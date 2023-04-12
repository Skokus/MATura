package com.example.demo.users.userprogress;

import com.example.demo.domain.category.models.Category;
import lombok.Data;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

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

    public void markTaskAsDone(String taskId, String categoryName){
        for(CategoryProgress c : userProgress){
            if(c.getName().equals(categoryName)){
                c.markTaskAsDone(taskId);
            }
        }
    }

    public CategoryProgress getCategoryProgress(String name){
        CategoryProgress p = userProgress.stream().filter(e -> e.getName().equals(name)).findFirst().get();
        return p;
    }

    public void addTaskToCategory(String name, String id){
        CategoryProgress p = userProgress.stream().filter(e -> e.getName().equals(name)).findFirst().get();
        p.addTask(id);
    }

    public void removeTaskFromCategory(String name, String id){
        CategoryProgress p = userProgress.stream().filter(e -> e.getName().equals(name)).findFirst().get();
        p.removeTask(id);
    }

    public void addCategory(Category c){
        CategoryProgress p = new CategoryProgress(c);
        userProgress.add(p);
    }

    public void removeCategory(Category c){
        CategoryProgress p = userProgress.stream().filter(e -> e.getName().equals(c.getName())).findFirst().get();
        userProgress.remove(p);
    }

}
