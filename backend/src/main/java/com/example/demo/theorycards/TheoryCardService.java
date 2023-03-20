package com.example.demo.theorycards;

import java.util.List;
import java.util.Optional;

public interface TheoryCardService {
    TheoryCard saveTheoryCard(TheoryCardDTO tc);
    List<TheoryCard> getTheoryCards(String tag);
    TheoryCard getTheoryCardById(String id);
    void removeTheoryCard(String id);
    TheoryCard editTheoryCard(TheoryCardDTO tc, String id);
}
