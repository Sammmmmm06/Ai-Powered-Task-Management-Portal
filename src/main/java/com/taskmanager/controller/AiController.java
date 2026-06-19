package com.taskmanager.controller;

import com.taskmanager.dto.AiRequest;
import com.taskmanager.dto.AiResponse;
import com.taskmanager.service.AiService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/suggest")
    public AiResponse suggestTask(
            @RequestBody AiRequest request) {

        String response =
                aiService.generateSuggestion(
                        request.getTitle());

        return new AiResponse(response);
    }
}