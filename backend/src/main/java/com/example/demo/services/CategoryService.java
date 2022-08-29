package com.example.demo.services;

import com.example.demo.exceptions.CategoryNotFoundException;
import com.example.demo.models.Category;
import com.example.demo.models.Task;
import com.example.demo.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category saveCategory(String name){
        if(categoryRepository.findByName(name) == null)
            throw new CategoryNotFoundException("Category named " + name + " does not exist");
        Category c = new Category(name);
        categoryRepository.save(c);
        return c;
    }

    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    public Category getCategoryById(String id){
        Category c = categoryRepository.findById(id).get();
        if(c == null){
            throw new CategoryNotFoundException("Category does not exist");
        }
        return c;
    }

    public Category getCategoryByName(String name){
        Category c = categoryRepository.findByName(name);
        if(c == null){
            throw new CategoryNotFoundException("Category does not exist");
        }
        return c;
    }

    public List<String> getCategoryNames(){
        List<Category> categories = categoryRepository.findAll();
        List<String> names = new ArrayList<>();
        for(Category c : categories){
            names.add(c.getName());
        }
        return names;
    }

    public int getNumberOfTasks(String name){
        Category c = categoryRepository.findByName(name);
        if(c == null){
            throw new CategoryNotFoundException("Category does not exist");
        }
        return c.getTasks().size();
    }

    public Category deleteCategory(String id){
        Category c = categoryRepository.findById(id).get();
        if(c == null){
            throw new CategoryNotFoundException("Category does not exist");
        }
        categoryRepository.delete(c);
        return c;
    }

    public Task addTaskToCategory(Task t, String categoryName){
        Category c = categoryRepository.findByName(categoryName);
        if(c == null){
            throw new CategoryNotFoundException("Category does not exist");
        }
        c.getTasks().add(t);
        return t;
    }

    public Task getTaskByPlaceInCategory(String categoryName, int id){
        Category c = categoryRepository.findByName(categoryName);
        if(c == null){
            throw new CategoryNotFoundException("Category does not exist");
        }
        Task t = c.getTasks().get(id);
        return t;
    }
}
