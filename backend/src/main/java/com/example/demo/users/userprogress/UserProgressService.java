package com.example.demo.users.userprogress;

import com.example.demo.category.models.Category;
import com.example.demo.users.models.User;
import com.example.demo.users.exceptions.UserNotFoundException;
import com.example.demo.users.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserProgressService {
    private final UserRepository userRepository;

    public UserProgress getUserProgress(String userName){
        Optional<User> user = userRepository.findUserByUsername(userName);
        if(user.isEmpty()){
            throw new UserNotFoundException("User: " + userName + "not found.");
        }
        return user.get().getUserProgress();
    }

    public CategoryProgress getCategoryProgress(String userName, String categoryName){
        Optional<User> user = userRepository.findUserByUsername(userName);
        if(user.isEmpty()){
            throw new UserNotFoundException("User: " + userName + "not found.");
        }
        return user.get().getUserProgress().getCategoryProgress(categoryName);
    }

    public void markTaskAsDone(String userName, String id, String category){
        Optional<User> user = userRepository.findUserByUsername(userName);
        if(user.isEmpty()){
            System.out.println("lmao");
            throw new UserNotFoundException("User: " + userName + "not found.");
        }
        user.get().getUserProgress().markTaskAsDone(id, category);
        log.info("User {} did task {} in category {}", userName, id, category);
        userRepository.save(user.get());
    }

    public void addCategory(Category c){
        for(User u : userRepository.findAll()){
            u.getUserProgress().addCategory(c);
            userRepository.save(u);
        }
    }

    public void removeCategory(Category c){
        for(User u : userRepository.findAll()){
            u.getUserProgress().removeCategory(c);
            userRepository.save(u);
        }
    }

    public void addTaskToCategory(String categoryName, String id){
        for(User u : userRepository.findAll()){
            u.getUserProgress().addTaskToCategory(categoryName, id);
            userRepository.save(u);
        }
    }

    public void removeTaskFromCategory(String categoryName, String id){
        for(User u : userRepository.findAll()){
            u.getUserProgress().removeTaskFromCategory(categoryName, id);
            userRepository.save(u);
        }
    }
}
