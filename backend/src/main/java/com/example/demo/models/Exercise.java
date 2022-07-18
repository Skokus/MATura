package com.example.demo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class Exercise {

    @Id
    private String id;
    @Field
    private String Document;
    @Field
    private double solutions;

    public Exercise(){}

    public Exercise(String document, double solutions) {
        Document = document;
        this.solutions = solutions;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDocument() {
        return Document;
    }

    public void setDocument(String document) {
        Document = document;
    }

    public double getSolutions() {
        return solutions;
    }

    public void setSolutions(double solutions) {
        this.solutions = solutions;
    }

    @Override
    public String toString() {
        return "Exercise{" +
                "id='" + id + '\'' +
                ", Document='" + Document + '\'' +
                ", solutions=" + solutions +
                '}';
    }
}
