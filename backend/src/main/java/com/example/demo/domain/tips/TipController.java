package com.example.demo.domain.tips;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "TipsController")
@RequestMapping(value = "/api/tips")
@RequiredArgsConstructor
public class TipController {

    private final TipService tipService;

    @RequestMapping(value = "", method = RequestMethod.POST)
    @Operation(summary = "Save tip")
    public ResponseEntity<Tip> saveTip(@RequestBody Tip t){
        return new ResponseEntity<>(tipService.saveTip(t), HttpStatus.CREATED);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    @Operation(summary = "Get all tips")
    public ResponseEntity<List<Tip>> getAllTips(){
        return new ResponseEntity<>(tipService.getAllTips(), HttpStatus.OK);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    @Operation(summary = "Get tip by id")
    public ResponseEntity<Tip> getTipById(@PathVariable String id){
        return new ResponseEntity<>(tipService.getTipById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    @Operation(summary = "Edit tip")
    public ResponseEntity<Tip> editTip(@PathVariable String id, @RequestBody Tip t){
        return new ResponseEntity<>(tipService.editTip(t, id), HttpStatus.OK);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @Operation(summary = "Delete tip")
    public ResponseEntity removeTip(@PathVariable String id){
        tipService.removeTip(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
