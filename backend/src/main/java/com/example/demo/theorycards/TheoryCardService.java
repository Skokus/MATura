package com.example.demo.theorycards;

import java.util.List;
import java.util.Optional;

public interface TheoryCardService {
    TheoryCard saveTheoryCard(TheoryCard tc);
    List<TheoryCard> getAllTheoryCards();
    List<TheoryCard> getTheoryCardsByTag(String tag);
    TheoryCard getTheoryCardById(String id);
}
