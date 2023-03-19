package com.example.demo.tasks;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "tasks")
@AllArgsConstructor
@RequiredArgsConstructor
@Getter @Setter
@Builder
public class TaskDTO {
    @Id
    private String id;
    private String question;
    private List<StepDTO> steps;
    private List<String> tips;
    private List<String> theoryCards;
}
