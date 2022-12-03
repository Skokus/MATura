package com.example.demo.theorycards;

import java.util.List;
import java.util.Optional;

public interface TheoryCardService {
    TheoryCard saveTheoryCard(TheoryCard tc);
    List<TheoryCard> getAllTheoryCards();
    TheoryCard getTheoryCardById(String id);
}
