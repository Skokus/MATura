package com.example.demo.tasks;

import java.util.List;

public interface TaskService {
    Task saveTask(Task t);
    List<Task> getAllTasks();
    Task getTaskById(String id);
    void removeTask(String id);
    Task editTask(Task t, String id);
}
