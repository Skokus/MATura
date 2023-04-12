package com.example.demo.domain.theorycards;

import java.util.List;

public interface TheoryCardService {
    TheoryCard saveTheoryCard(TheoryCardDTO tc);
    List<TheoryCard> getTheoryCards(String tag);
    TheoryCard getTheoryCardById(String id);
    void removeTheoryCard(String id);
    TheoryCard editTheoryCard(TheoryCardDTO tc, String id);
}
