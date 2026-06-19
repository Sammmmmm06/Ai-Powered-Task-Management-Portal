package com.taskmanager.security;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.RequestMatchers;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.taskmanager.security.JwtAuthenticationFilter;
@Configuration
public class SecurityConfig {
	
	@Bean
	 public PasswordEncoder passwordEncoder() {
		 return new BCryptPasswordEncoder();
	 }
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		
		 http
		 	.cors(cors -> {})
	        .csrf(csrf -> csrf.disable())
	        .authorizeHttpRequests(auth -> auth
	                .requestMatchers("/api/auth/**",
	                		"/api/ai/**",
	                		"/swagger-ui/**",
	                        "/v3/api-docs/**")
	                .permitAll()
	                .anyRequest()
	                .authenticated()
	        )
	        .addFilterBefore(
	                jwtAuthenticationFilter,
	                UsernamePasswordAuthenticationFilter.class
	        );

	    return http.build();
		
	}
	private final JwtAuthenticationFilter jwtAuthenticationFilter;

	public SecurityConfig(
	        JwtAuthenticationFilter jwtAuthenticationFilter) {

	    this.jwtAuthenticationFilter = jwtAuthenticationFilter;
	}
}
