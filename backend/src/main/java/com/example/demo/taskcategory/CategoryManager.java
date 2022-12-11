package com.example.demo.taskcategory;

import com.example.demo.photos.PhotoService;
import com.example.demo.taskcategory.exceptions.CategoryAlreadyExistsException;
import com.example.demo.taskcategory.exceptions.CategoryNotFoundException;
import com.example.demo.taskcategory.exceptions.TaskDoesNotExistException;
import com.example.demo.users.UserService;
import com.example.demo.taskcategory.models.Category;
import com.example.demo.tasks.Task;
import com.example.demo.users.userprogress.UserProgressService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryManager implements CategoryService{

    private final CategoryRepository categoryRepository;
    private final UserProgressService userProgressService;

    public Category saveCategory(String name){
        if(categoryRepository.findByName(name) != null) {
            log.error("Category named {} already exists.", name);
            throw new CategoryAlreadyExistsException("Category named " + name + " already exists");
        }
        Category c = new Category(name);
        categoryRepository.save(c);
        log.info("Created category {}.", name);
        userProgressService.addCategory(c);
        return c;
    }

    public List<Category> getAllCategories(){
        log.info("Get all categories called.");
        return categoryRepository.findAll();
    }

    public Category getCategoryById(String id){
        Optional<Category> c = categoryRepository.findById(id);
        if(c.isEmpty()){
            log.error("Category with id: {} not found.", id);
            throw new CategoryNotFoundException("Category does not exist");
        }
        log.info("Category with id: {} found, it's name: {}.", id, c.get().getName());
        return c.get();
    }

    public Category getCategoryByName(String name){
        Category c = categoryRepository.findByName(name);
        if(c == null){
            log.error("Category {} not found.", name);
            throw new CategoryNotFoundException("Category does not exist");
        }
        log.info("Found category {}.", name);
        return c;
    }

    public List<String> getCategoryNames(){
        List<Category> categories = categoryRepository.findAll();
        List<String> names = new ArrayList<>();
        for(Category c : categories){
            names.add(c.getName());
        }
        log.info("Getting categories' names.");
        return names;
    }

    public void deleteCategory(String id){
        Optional<Category> c = categoryRepository.findById(id);
        if(c.isEmpty()){
            throw new CategoryNotFoundException("Category does not exist");
        }
        categoryRepository.delete(c.get());
        userProgressService.removeCategory(c.get());
        log.info("Deleting category {}.", c.get().getName());
    }

    public String addTaskToCategory(String categoryName, String id){
        Category c = categoryRepository.findByName(categoryName);
        if(c == null){
            throw new CategoryNotFoundException("Category does not exist");
        }
        c.addTask(id);
        categoryRepository.save(c);
        userProgressService.addTaskToCategory(categoryName, id);
        return id;
    }

    public void removeTaskFromCategory(String categoryName, String id){
        Category c = categoryRepository.findByName(categoryName);
        if(c == null){
            throw new CategoryNotFoundException("Category does not exist");
        }
        c.removeTask(id);
        categoryRepository.save(c);
        userProgressService.removeTaskFromCategory(categoryName, id);
    }
}
