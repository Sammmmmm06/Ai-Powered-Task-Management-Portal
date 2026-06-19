package com.taskmanager.controller;

import java.util.List;
import com.taskmanager.service.TaskService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.dto.TaskRequest;
import com.taskmanager.dto.TaskResponse;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }
    @PostMapping
    public TaskResponse createTask(
            @RequestBody TaskRequest request,
            Authentication authentication) {

        return taskService.createTask(
                request,
                authentication.getName());
    }
	@GetMapping
	public List<TaskResponse> getMyTasks(
	        Authentication authentication) {

	    return taskService.getMyTasks(
	            authentication.getName());
	}
	@GetMapping("/{id}")
	public TaskResponse getTaskById(
	        @PathVariable Long id,
	        Authentication authentication) {

	    return taskService.getTaskById(
	            id,
	            authentication.getName());
	}
	@PutMapping("/{id}")
	public TaskResponse updateTask(
	        @PathVariable Long id,
	        @RequestBody TaskRequest request,
	        Authentication authentication) {

	    return taskService.updateTask(
	            id,
	            request,
	            authentication.getName());
	}
	@DeleteMapping("/{id}")
	public String deleteTask(
	        @PathVariable Long id,
	        Authentication authentication) {

	    taskService.deleteTask(
	            id,
	            authentication.getName());

	    return "Task Deleted Successfully";
	}

}
