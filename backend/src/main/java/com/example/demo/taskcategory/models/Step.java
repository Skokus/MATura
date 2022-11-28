package com.example.demo.taskcategory.models;

import lombok.Builder;
import lombok.Data;
import org.bson.types.Binary;

@Data
public class Step {
    private String content;
    private String currentSolution;
    private double answer;

    public Step(){

    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public double getAnswer() {
        return answer;
    }

    public void setAnswer(double answer) {
        this.answer = answer;
    }

    public String getCurrentSolution() {
        return currentSolution;
    }

    public void setCurrentSolution(String currentSolution) {
        this.currentSolution = currentSolution;
    }

}
