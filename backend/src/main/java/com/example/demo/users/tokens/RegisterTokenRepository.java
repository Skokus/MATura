package com.example.demo.users.tokens;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface RegisterTokenRepository extends MongoRepository<RegisterToken, String> {
    Optional<RegisterToken> findByToken(String token);
}
