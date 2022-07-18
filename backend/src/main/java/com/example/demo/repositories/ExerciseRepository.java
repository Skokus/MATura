package com.example.demo.repositories;

import com.example.demo.models.Exercise;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciseRepository extends MongoRepository<Exercise, String> {
}
