package com.example.demo.tasks;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Random;

@Component
@RequiredArgsConstructor
public class DailyTaskScheduler {

    private List<Task> availableTasks;
    private Task currentTask;
    private final TaskService taskService;

    @Scheduled(fixedRate = 1000*60*60*24)
    public void chooseNewTask() {
        Random rand = new Random();
        if(availableTasks == null || availableTasks.size() == 0){
            setAvailableTasks(taskService.getAllTasks());
        }
        int i = rand.nextInt(availableTasks.size());
        Task t = availableTasks.get(i);
        availableTasks.remove(i);
        setCurrentTask(t);
    }

    public List<Task> getAvailableTasks() {
        return availableTasks;
    }

    public void setAvailableTasks(List<Task> availableTasks) {
        this.availableTasks = availableTasks;
    }

    public Task getCurrentTask() {
        return currentTask;
    }

    public void setCurrentTask(Task currentTask) {
        this.currentTask = currentTask;
    }
}
