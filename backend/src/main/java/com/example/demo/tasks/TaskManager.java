package com.example.demo.tasks;

import com.example.demo.category.exceptions.TaskDoesNotExistException;
import com.example.demo.photos.Photo;
import com.example.demo.photos.PhotoService;
import com.example.demo.theorycards.TheoryCard;
import com.example.demo.theorycards.TheoryCardDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskManager implements TaskService{

    private final TaskRepository taskRepository;
    private final PhotoService photoService;
    public Task saveTask(TaskDTO t) {
        Task task = taskDTOToTask(t);
        taskRepository.save(task);
        return task;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(String id) {
        Optional<Task> task = taskRepository.findById(id);
        if(task.isEmpty())
            throw new TaskDoesNotExistException(id);
        return task.get();
    }

    public List<String> getAllTasksIds(){
        List<String> ids = new ArrayList<>();
        for(Task t : taskRepository.findAll()){
            ids.add(t.getId());
        }
        return ids;
    }

    public void removeTask(String id) {
        taskRepository.deleteById(id);
    }

    public Task editTask(Task t, String id) {
        Optional<Task> task = taskRepository.findById(id);
        if(task.isEmpty())
            throw new TaskDoesNotExistException(id);
        Task newTask = task.get();
        newTask.setQuestion(t.getQuestion());
        newTask.setSteps(t.getSteps());
        newTask.setTheoryCards(t.getTheoryCards());
        newTask.setTips(t.getTips());
        taskRepository.save(newTask);
        return newTask;
    }

    private Task taskDTOToTask(TaskDTO td){
        Task t = new Task();
        List<Step> s = new ArrayList<>();
        for(StepDTO stepDTO : td.getSteps()){
            Step step = new Step();
            step.setAnswer(stepDTO.getAnswer());
            step.setCurrentSolution(stepDTO.getCurrentSolution());
            step.setAbcAnswers(stepDTO.getAbcAnswers());
            step.setContent(stepDTO.getContent());
            if(stepDTO.getImageId() != null){
                Photo p = photoService.getPhoto(stepDTO.getImageId());
                step.setImage(p.getImage());
                photoService.removePhoto(p.getId());
                System.out.println("Dodane zdjęcie");
            } else {
                step.setImage(null);
            }
            s.add(step);
        }
        t.setQuestion(td.getQuestion());
        t.setTheoryCards(td.getTheoryCards());
        t.setTips(td.getTips());
        t.setSteps(s);
        return t;
    }

}
