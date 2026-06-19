package com.taskmanager.service;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.taskmanager.dto.AuthResponse;
import com.taskmanager.dto.LoginRequest;
import com.taskmanager.dto.RegisterRequest;
import com.taskmanager.entity.User;
import com.taskmanager.exception.InvalidCredentialsException;
import com.taskmanager.exception.UserAlreadyExistsException;
import com.taskmanager.repository.UserRepository;

@Service
public class AuthService {
	
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	
	public AuthService(UserRepository userRepository,PasswordEncoder passwordEncoder,JwtService jwtService) {
		this.userRepository=userRepository;
		this.passwordEncoder=passwordEncoder;
		this.jwtService=jwtService;
	}
	
	public String register(RegisterRequest request) {
		
		if(userRepository.findByEmail(request.getEmail()).isPresent()) {
			throw new UserAlreadyExistsException("Email already registered");
		}
		
		User user=User.builder()
				.name(request.getName())
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.createdAt(LocalDateTime.now())
				.build();
		
		userRepository.save(user);
		
		return "User Registered Successfully";
	}
	public AuthResponse login(LoginRequest request) {
		
	
		

	    User user = userRepository.findByEmail(request.getEmail())
	            .orElseThrow(() ->
	                    new InvalidCredentialsException("Invalid Email"));
	    
	    
	    if(!passwordEncoder.matches(
	            request.getPassword(),
	            user.getPassword())) {

	        throw new InvalidCredentialsException("Invalid Password");
	    }

	    return new AuthResponse(jwtService.generateToken(user.getEmail()));
	}
	

}
