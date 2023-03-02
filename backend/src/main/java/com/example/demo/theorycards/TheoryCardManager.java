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

    public List<TheoryCard> getTheoryCards(String tag) {
        if(tag == null){
            return theoryCardRepository.findAll();
        }
        return theoryCardRepository.findAllByTag(tag);
    }

    public TheoryCard getTheoryCardById(String id) {
        return theoryCardRepository.findById(id).get();
    }

    public void removeTheoryCard(String id) {
        theoryCardRepository.deleteById(id);
    }

    public TheoryCard editTheoryCard(TheoryCard tc, String id) {
        Optional<TheoryCard> card = theoryCardRepository.findById(id);
        if(card.isEmpty()){

        }
        TheoryCard t = card.get();
        t.setTag(tc.getTag());
        t.setCardsContent(tc.getCardsContent());
        t.setDescription(tc.getDescription());
        t.setImage(tc.getImage());
        theoryCardRepository.save(t);
        return t;
    }

}
