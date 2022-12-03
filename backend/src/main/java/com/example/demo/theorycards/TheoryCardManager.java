package com.example.demo.theorycards;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TheoryCardManager implements TheoryCardService{

    private final TheoryCardRepository theoryCardRepository;

    public TheoryCard saveTheoryCard(TheoryCard tc) {
        theoryCardRepository.save(tc);
        log.info("Created theorycard {}.", tc.getDescription());
        return tc;
    }

    public List<TheoryCard> getAllTheoryCards() {
        return theoryCardRepository.findAll();
    }

    public TheoryCard getTheoryCardById(String id) {
        return theoryCardRepository.findById(id).get();
    }

}
