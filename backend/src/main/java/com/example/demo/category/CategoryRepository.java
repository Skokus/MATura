package com.example.demo.category;

import com.example.demo.category.models.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, String> {
    Category findByName(String name);
}
