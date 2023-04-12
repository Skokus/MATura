package com.example.demo.domain.tasks;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.Binary;

import java.util.List;

@Data
@Getter @Setter
public class Step {
    private String content;
    private String currentSolution;
    private List<String> abcAnswers;
    private Binary image;
    private String answer;
}
