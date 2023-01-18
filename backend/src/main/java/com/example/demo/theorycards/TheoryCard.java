package com.example.demo.theorycards;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "theorycards")
@ToString
@Data
@Getter @Setter
public class TheoryCard {
    @Id
    private String id;
    private String tag;
    private String description;
    private String cardsContent;
    private String photoId;
}
