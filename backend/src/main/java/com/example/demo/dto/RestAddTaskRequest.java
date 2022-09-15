package com.example.demo.dto;

import com.example.demo.models.Step;
import lombok.*;

import java.util.List;

@RequiredArgsConstructor
@Getter @Setter
public class RestAddTaskRequest {
    private String question;
    private List<Step> steps;
}
