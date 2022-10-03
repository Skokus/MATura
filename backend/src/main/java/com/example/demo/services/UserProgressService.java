package com.example.demo.services;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.models.CategoryProgress;
import com.example.demo.models.User;
import com.example.demo.models.UserProgress;
import com.example.demo.repositories.UserRepository;
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

    public void markTaskAsDone(String userName, Integer idx, String category){
        Optional<User> user = userRepository.findUserByUsername(userName);
        if(user.isEmpty()){
            throw new UserNotFoundException("User: " + userName + "not found.");
        }
        user.get().getUserProgress().markTaskAsDone(idx, category);
        log.info("User {} did task {} in category {}", userName, idx, category);
        userRepository.save(user.get());
    }
}
