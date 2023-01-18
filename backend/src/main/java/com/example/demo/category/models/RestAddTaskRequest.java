package com.example.demo.category.models;

import com.example.demo.tasks.Step;
import lombok.*;

import java.util.List;

@RequiredArgsConstructor
@Getter @Setter
public class RestAddTaskRequest {
    private String question;
    private List<Step> steps;
    private List<String> tips;
}
