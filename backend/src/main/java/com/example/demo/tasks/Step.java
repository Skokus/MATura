package com.example.demo.tasks;

import lombok.Builder;
import lombok.Data;
import org.bson.types.Binary;

@Data
public class Step {
    private String content;
    private String currentSolution;
    private String possibleSolutions;
    private String imageId;
    private String answer;

    public Step(){

    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getCurrentSolution() {
        return currentSolution;
    }

    public void setCurrentSolution(String currentSolution) {
        this.currentSolution = currentSolution;
    }

    public String getImageId() {
        return imageId;
    }

    public void setImageId(String imageId) {
        this.imageId = imageId;
    }

    public String getPossibleSolutions() {
        return possibleSolutions;
    }

    public void setPossibleSolutions(String possibleSolutions) {
        this.possibleSolutions = possibleSolutions;
    }
}
