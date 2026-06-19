package com.taskmanager.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.taskmanager.dto.TaskRequest;
import com.taskmanager.dto.TaskResponse;
import com.taskmanager.entity.Task;
import com.taskmanager.entity.User;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.repository.UserRepository;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository,
                       UserRepository userRepository) {

        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public TaskResponse createTask(TaskRequest request,
                                   String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority())
                .dueDate(request.getDueDate())
                .status(request.getStatus())
                .estimatedHours(request.getEstimatedHours())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .user(user)
                .build();

        Task savedTask = taskRepository.save(task);

        return mapToResponse(savedTask);
    }

    private TaskResponse mapToResponse(Task task) {

        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .status(task.getStatus())
                .estimatedHours(task.getEstimatedHours())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }
    public List<TaskResponse> getMyTasks(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<Task> tasks = taskRepository.findByUser(user);

        List<TaskResponse> responses = new ArrayList<>();

        for(Task task : tasks) {
            responses.add(mapToResponse(task));
        }

        return responses;
    }
    public TaskResponse getTaskById(Long id, String email) {


    	Optional<Task> optionalTask =
    	        taskRepository.findById(id);

    	if(optionalTask.isEmpty()) {
    	    throw new RuntimeException("Task not found");
    	}

    	Task task = optionalTask.get();

        if (!task.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }

        return mapToResponse(task);
    }
    public TaskResponse updateTask(
            Long id,
            TaskRequest request,
            String email) {
    	Optional<Task> optionalTask =
    	        taskRepository.findById(id);

    	if(optionalTask.isEmpty()) {
    	    throw new RuntimeException("Task not found");
    	}

    	Task task = optionalTask.get();

    	 if (!task.getUser().getEmail().equals(email)) {
    	        throw new RuntimeException("Unauthorized");
    	    }
    	 
    	 task.setTitle(request.getTitle());
    	    task.setDescription(request.getDescription());
    	    task.setPriority(request.getPriority());
    	    task.setDueDate(request.getDueDate());
    	    task.setStatus(request.getStatus());
    	    task.setEstimatedHours(request.getEstimatedHours());

    	    task.setUpdatedAt(LocalDateTime.now());

    	    Task updatedTask = taskRepository.save(task);

    	    return mapToResponse(updatedTask);
    }
    public void deleteTask(Long id, String email) {

        Optional<Task> optionalTask =
                taskRepository.findById(id);

        if(optionalTask.isEmpty()) {
            throw new RuntimeException("Task not found");
        }

        Task task = optionalTask.get();

        if(!task.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }

        taskRepository.delete(task);
    }
}