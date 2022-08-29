package com.example.demo.repositories;

import com.example.demo.models.UserProgress;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserProgressRepository extends MongoRepository<UserProgress, String> {

}
