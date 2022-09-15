package com.example.demo.models;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document
@AllArgsConstructor
@RequiredArgsConstructor
@Getter @Setter
@Builder
public class Task {
    @Id
    private String id;
    private String question;
    private List<Step> steps;
}
