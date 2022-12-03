package com.example.demo.theorycards;

import lombok.Data;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "theorycards")
@ToString
@Data
public class TheoryCard {
    @Id
    private String id;
    private String tag;
    private String description;
    private List<String> cardsContent;
    private String photoId;

    public TheoryCard(){

    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public List<String> getCardsContent() {
        return cardsContent;
    }

    public void setCardsContent(List<String> cardsContent) {
        this.cardsContent = cardsContent;
    }

    public String getPhotoId() {
        return photoId;
    }

    public void setPhotoId(String photoId) {
        this.photoId = photoId;
    }
}
