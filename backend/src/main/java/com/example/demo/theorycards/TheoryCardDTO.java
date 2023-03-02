package com.example.demo.theorycards;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.web.multipart.MultipartFile;

@ToString
@Data
@Getter
@Setter
public class TheoryCardDTO {
    @Id
    private String id;
    private String tag;
    private String description;
    private String cardsContent;
    private MultipartFile image;
}
