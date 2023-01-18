package com.example.demo.users.models;

import com.example.demo.category.models.Category;
import com.example.demo.users.userprogress.UserProgress;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "users")
public class User {

    @Id
    private String id;
    private String email;
    private String username;
    private String password;
    private String role;

    private UserProgress userProgress;

    public User(){

    }

    public User(String email, String username, String password, String role, List<Category> categoryList){
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
        this.userProgress = new UserProgress(categoryList);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public UserProgress getUserProgress() {
        return userProgress;
    }

    public void setUserProgress(UserProgress userProgress) {
        this.userProgress = userProgress;
    }

    @Override
    public String toString() {
        return "User{" +
                "email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
