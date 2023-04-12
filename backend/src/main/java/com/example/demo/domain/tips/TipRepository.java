package com.example.demo.domain.tips;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipRepository extends MongoRepository<Tip, String> {
}
