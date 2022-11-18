package com.example.demo.taskcategory;

import com.example.demo.taskcategory.exceptions.CategoryAlreadyExistsException;
import com.example.demo.taskcategory.exceptions.CategoryNotFoundException;
import com.example.demo.taskcategory.exceptions.TaskDoesNotExistException;
import com.example.demo.users.UserService;
import com.example.demo.taskcategory.models.Category;
import com.example.demo.taskcategory.models.Task;
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
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserService userService;

    public Category saveCategory(String name){
        if(categoryRepository.findByName(name) != null) {
            log.error("Category named {} already exists.", name);
            throw new CategoryAlreadyExistsException("Category named " + name + " already exists");
        }
        Category c = new Category(name);
        categoryRepository.save(c);
        log.info("Created category {}.", name);
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

    public int getNumberOfTasks(String name){
        Category c = categoryRepository.findByName(name);
        if(c == null){
            log.error("Category {} not found.", name);
            throw new CategoryNotFoundException("Category does not exist");
        }
        log.info("Number of tasks in category {}: {}.", name, c.getTasks().size());
        return c.getTasks().size();
    }

    public Category deleteCategory(String id){
        Optional<Category> c = categoryRepository.findById(id);
        if(c.isEmpty()){
            log.error("Category with id: {} not found.", id);
            throw new CategoryNotFoundException("Category does not exist");
        }
        categoryRepository.delete(c.get());
        log.info("Deleting category {}.", c.get().getName());
        return c.get();
    }

    public Task addTaskToCategory(Task t, String categoryName){
        Category c = categoryRepository.findByName(categoryName);
        if(c == null){
            log.error("Category {} not found.", categoryName);
            throw new CategoryNotFoundException("Category does not exist");
        }
        if(t.getId() == null){
            t.setId(new ObjectId().toString());
        }
        c.getTasks().add(t);
        categoryRepository.save(c);
        log.info("Adding task to category {}.", categoryName);
        return t;
    }

    public void removeTaskFromCategory(String id, String categoryName){
        Category c = categoryRepository.findByName(categoryName);
        if(c == null){
            log.error("Category {} not found.", categoryName);
            throw new CategoryNotFoundException("Category does not exist");
        }
        Optional<Task> t = c.getTasks()
                .stream()
                .filter(e -> e.getId() != null)
                .filter(e -> e.getId().equals(id))
                .findFirst();
        if(t.isEmpty()){
            log.error("Task with id: {} not found.", id);
            throw new TaskDoesNotExistException("Task does not exist");
        }
        c.getTasks().remove(t.get());
        categoryRepository.save(c);
    }

    public Task getTaskByPlaceInCategory(String categoryName, int id){
        Category c = categoryRepository.findByName(categoryName);
        if(c == null){
            log.error("Category {} not found.", categoryName);
            throw new CategoryNotFoundException("Category does not exist");
        }
        Task t = c.getTasks().get(id);
        log.info("Getting task number {} of category {}.", id, categoryName);
        return t;
    }
}
