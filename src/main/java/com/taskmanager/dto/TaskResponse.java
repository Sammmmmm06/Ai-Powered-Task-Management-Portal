package com.taskmanager.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.taskmanager.enums.Priority;
import com.taskmanager.enums.TaskStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TaskResponse {

    private Long id;

    private String title;

    private String description;

    private Priority priority;

    private LocalDate dueDate;

    private TaskStatus status;

    private Integer estimatedHours;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}