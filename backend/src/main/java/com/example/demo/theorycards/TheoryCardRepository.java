package com.example.demo.theorycards;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TheoryCardRepository extends MongoRepository<TheoryCard, String> {
    List<TheoryCard> findAllByTag(String tag);
}
