package com.example.demo.domain.theorycards;

import com.example.demo.domain.photos.Photo;
import com.example.demo.domain.photos.PhotoService;
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
    private final PhotoService photoService;

    public TheoryCard saveTheoryCard(TheoryCardDTO tc){
        TheoryCard t = theoryCardDTOToTheoryCard(tc);
        theoryCardRepository.save(t);
        log.info("Created theorycard {}.", tc.getDescription());
        return t;
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

    public TheoryCard editTheoryCard(TheoryCardDTO tcd, String id) {
        Optional<TheoryCard> card = theoryCardRepository.findById(id);
        if(card.isEmpty()){

        }
        TheoryCard t = card.get();
        TheoryCard newt = theoryCardDTOToTheoryCard(tcd);
        t.setTag(newt.getTag());
        t.setCardsContent(newt.getCardsContent());
        t.setDescription(newt.getDescription());
        if(newt.getImage() != null){
            t.setImage(newt.getImage());
        } else {
            t.setImage(t.getImage());
        }
        theoryCardRepository.save(t);
        return t;
    }

    private TheoryCard theoryCardDTOToTheoryCard(TheoryCardDTO tcd){
        TheoryCard t = new TheoryCard();
        if(tcd.getImageid() != null) {
            Photo p = photoService.getPhoto(tcd.getImageid());
            t.setImage(p.getImage());
            photoService.removePhoto(p.getId());
        }
        t.setTag(tcd.getTag());
        t.setDescription(tcd.getDescription());
        t.setCardsContent(tcd.getCardsContent());
        return t;
    }

}
