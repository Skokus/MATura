package com.example.demo.tasks;

import com.example.demo.taskcategory.exceptions.TaskDoesNotExistException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskManager implements TaskService{

    private final TaskRepository taskRepository;

    public Task saveTask(Task t) {
        taskRepository.save(t);
        return t;
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
        newTask.setTips(t.getTips());
        taskRepository.save(newTask);
        return newTask;
    }

}
