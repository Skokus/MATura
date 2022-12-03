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
public class Task {
    @Id
    private String id;
    private String question;
    private List<Step> steps;
    private List<String> tips;
}
