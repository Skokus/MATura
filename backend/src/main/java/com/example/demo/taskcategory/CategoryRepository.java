package com.example.demo.taskcategory;

import com.example.demo.taskcategory.models.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, String> {
    Category findByName(String name);
}
