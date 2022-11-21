package com.example.demo.taskcategory;

import com.example.demo.taskcategory.models.Category;
import com.example.demo.taskcategory.models.Task;

import java.util.List;

public interface CategoryService {
    Category saveCategory(String name);
    List<Category> getAllCategories();
    Category getCategoryById(String id);
    Category getCategoryByName(String name);
    List<String> getCategoryNames();
    int getNumberOfTasks(String name);
    Category deleteCategory(String id);
    Task addTaskToCategory(Task t, String categoryName);
    void removeTaskFromCategory(String id, String categoryName);
    Task getTaskByPlaceInCategory(String categoryName, int id);
}
