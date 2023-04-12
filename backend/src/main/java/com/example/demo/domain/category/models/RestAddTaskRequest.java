package com.example.demo.domain.category.models;

import com.example.demo.domain.tasks.Step;
import lombok.*;

import java.util.List;

@RequiredArgsConstructor
@Getter @Setter
public class RestAddTaskRequest {
    private String question;
    private List<Step> steps;
    private List<String> tips;
}
