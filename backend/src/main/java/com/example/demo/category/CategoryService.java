package com.example.demo.category;

import com.example.demo.category.models.Category;

import java.util.List;

public interface CategoryService {
    Category saveCategory(String name);
    List<Category> getAllCategories();
    Category getCategoryById(String id);
    void deleteCategory(String id);
    Category getCategoryByName(String name);
    List<String> getCategoryNames();
    String addTaskToCategory(String categoryName, String id);
    void removeTaskFromCategory(String categoryName, String id);
}
