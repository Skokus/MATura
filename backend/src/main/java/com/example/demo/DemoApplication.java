package com.example.demo;

import com.example.demo.models.Exercise;
import com.example.demo.repositories.ExerciseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication implements CommandLineRunner {

	private final ExerciseRepository exerciseRepository;

	public DemoApplication(ExerciseRepository exerciseRepository){
		this.exerciseRepository = exerciseRepository;
	}
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		if(exerciseRepository.findAll().isEmpty()){
			exerciseRepository.save(new Exercise("lmao", 3.0));
			exerciseRepository.save(new Exercise("lmao2", 23.0));
		}

		for(Exercise e: exerciseRepository.findAll()){
			System.out.println(e.toString());
		}
	}
}
