package com.example.demo.tips;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TipRepository extends MongoRepository<Tip, String> {
}
