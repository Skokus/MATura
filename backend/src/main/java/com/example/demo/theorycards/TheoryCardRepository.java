package com.example.demo.theorycards;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TheoryCardRepository extends MongoRepository<TheoryCard, String> {
    List<TheoryCard> findAllByTag(String tag);
}
