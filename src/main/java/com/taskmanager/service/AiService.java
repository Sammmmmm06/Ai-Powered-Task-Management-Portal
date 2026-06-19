package com.taskmanager.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AiService {

    @Value("${groq.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate =
            new RestTemplate();

    public String generateSuggestion(String title) {

        try {

            String url =
                    "https://api.groq.com/openai/v1/chat/completions";

            HttpHeaders headers =
                    new HttpHeaders();

            headers.setBearerAuth(apiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            String requestBody =
                    """
                    {
                      "model": "llama-3.1-8b-instant",
                      "messages": [
                        {
                          "role": "system",
                          "content": "You are a task management assistant. Return only Priority, Estimated Hours and Description."
                        },
                        {
                          "role": "user",
                          "content": "Task: %s"
                        }
                      ]
                    }
                    """.formatted(title);

            HttpEntity<String> request =
                    new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> response =
                    restTemplate.postForEntity(
                            url,
                            request,
                            String.class);

            ObjectMapper mapper =
                    new ObjectMapper();

            JsonNode root =
                    mapper.readTree(response.getBody());

            return root
                    .get("choices")
                    .get(0)
                    .get("message")
                    .get("content")
                    .asText();

        } catch (Exception e) {

            e.printStackTrace();

            return """
                    Priority: MEDIUM

                    Estimated Hours: 4

                    Description:
                    Complete the task '%s' by dividing it into smaller milestones,
                    tracking progress regularly, and updating the task status as work progresses.
                    """.formatted(title);
        }
    }
}