package com.example.demo.tasks;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Data
@Getter @Setter
public class StepDTO {
    private String content;
    private String currentSolution;
    private List<String> abcAnswers;
    private String imageId;
    private String answer;
}
