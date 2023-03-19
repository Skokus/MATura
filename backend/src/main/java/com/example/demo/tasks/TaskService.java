package com.example.demo.tasks;

import java.util.List;

public interface TaskService {
    Task saveTask(TaskDTO t);
    List<Task> getAllTasks();
    List<String> getAllTasksIds();
    Task getTaskById(String id);
    void removeTask(String id);
    Task editTask(Task t, String id);
}
