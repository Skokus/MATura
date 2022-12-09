package com.example.demo.theorycards;

import com.nimbusds.oauth2.sdk.http.HTTPRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "TheoryCardsController")
@RequestMapping(value = "/api/theory-cards")
@RequiredArgsConstructor
public class TheoryCardController {

    private final TheoryCardService theoryCardService;

    @RequestMapping(value = "", method = RequestMethod.POST)
    @Operation(summary = "Save theory card")
    public ResponseEntity<TheoryCard> saveTheoryCard(@RequestBody TheoryCard tc){
        return new ResponseEntity<>(theoryCardService.saveTheoryCard(tc), HttpStatus.CREATED);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    @Operation(summary = "Get all theory cards")
    public ResponseEntity<List<TheoryCard>> getAllTheoryCards(){
        return new ResponseEntity<>(theoryCardService.getAllTheoryCards(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @Operation(summary = "Get theory card by id")
    public ResponseEntity<TheoryCard> getTheoryCardById(@PathVariable String id){
        return new ResponseEntity<>(theoryCardService.getTheoryCardById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @Operation(summary = "Edit theorycard")
    public ResponseEntity<TheoryCard> editTheoryCard(@PathVariable String id, @RequestBody TheoryCard t){
        return new ResponseEntity<>(theoryCardService.editTheoryCard(t, id), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @Operation(summary = "Delete theorycard")
    public ResponseEntity removeTheoryCard(@PathVariable String id){
        theoryCardService.removeTheoryCard(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
