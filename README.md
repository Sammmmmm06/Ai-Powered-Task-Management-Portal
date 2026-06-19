# AI Powered Task Management System

## Overview

AI Powered Task Management System is a full-stack web application that helps users manage tasks efficiently with the assistance of Artificial Intelligence.

The application allows users to create, update, delete, and track tasks while leveraging AI to generate task suggestions, descriptions, priorities, and estimated completion hours.

---

## Features

### Authentication & Security

* User Registration
* User Login
* JWT Authentication
* Protected APIs using Spring Security

### Task Management

* Create Tasks
* View Tasks
* Edit Tasks
* Delete Tasks
* Task Status Management

  * TODO
  * IN_PROGRESS
  * COMPLETED
* Priority Management

  * LOW
  * MEDIUM
  * HIGH
* Due Date Tracking
* Estimated Hours Tracking

### AI Integration

* AI-powered task suggestions
* Generates task descriptions based on task title
* Provides estimated completion hours
* Helps users organize and plan tasks effectively

---

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Java 17
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate

### Database

* MySQL

### API Documentation

* Swagger / OpenAPI

### AI Integration

* Groq API
* Llama 3.1 Model

---

## Project Architecture

Frontend (React)
↓
REST API
↓
Spring Boot Backend
↓
MySQL Database

AI Suggestion
↓
Groq API
↓
Llama 3.1 Model

---

## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

### Tasks

GET /api/tasks

GET /api/tasks/{id}

POST /api/tasks

PUT /api/tasks/{id}

DELETE /api/tasks/{id}

### AI

POST /api/ai/suggest

---

## AI Workflow

1. User enters task title.
2. AI Suggest button is clicked.
3. Backend sends request to Groq API.
4. AI generates:

   * Priority
   * Estimated Hours
   * Task Description
5. Suggestion is displayed in the application.

---

## Installation & Setup

### Clone Repository

git clone <repository-url>

### Backend Setup

1. Open project in STS / IntelliJ.
2. Configure MySQL database.
3. Update application.properties.
4. Run Spring Boot application.

### Frontend Setup

cd frontend

npm install

npm run dev

---

## Database Configuration

Update application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/taskmanager

spring.datasource.username=root

spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update

---

## Future Enhancements

* Email Notifications
* Task Reminders
* AI-Based Task Prioritization
* Dashboard Analytics
* Team Collaboration
* Calendar Integration

---

## Screenshots

* Login Page
* Dashboard
* Create Task Page
* Edit Task Page
* AI Suggestion Feature
* Swagger Documentation

---

## Author

Samrudhi Ulman

B.Tech Computer Engineering

DY Patil University

2026
