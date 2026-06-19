package com.taskmanager.dto;

import java.time.LocalDate;

import com.taskmanager.enums.Priority;
import com.taskmanager.enums.TaskStatus;

import lombok.Data;

@Data
public class TaskRequest {

    private String title;

    private String description;

    private Priority priority;

    private LocalDate dueDate;

    private TaskStatus status;

    private Integer estimatedHours;
}