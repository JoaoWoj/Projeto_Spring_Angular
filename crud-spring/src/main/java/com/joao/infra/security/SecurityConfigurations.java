package com.joao.infra.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {
	
	 @Autowired
	 SecurityFilter securityFilter;
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
		return httpSecurity
				.csrf(csrf -> csrf.disable())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(authorize -> authorize
						.requestMatchers("/h2-console/**").permitAll()
						.requestMatchers(HttpMethod.POST, "api/auth/login").permitAll()
						.requestMatchers(HttpMethod.POST, "api/auth/register").hasRole("ADMIN")
						.requestMatchers(HttpMethod.POST, "/api/books").hasRole("ADMIN")
						.requestMatchers(HttpMethod.PUT, "/api/books/{id}").hasRole("ADMIN")
						.requestMatchers(HttpMethod.DELETE, "/api/books/{id}").hasRole("ADMIN")
						.requestMatchers(HttpMethod.PATCH, "/api/books/{id}").hasRole("ADMIN")
						.requestMatchers(HttpMethod.POST, "/api/users").hasRole("ADMIN")
						.requestMatchers(HttpMethod.DELETE, "/api/users/{id}").hasRole("ADMIN")
						.anyRequest().authenticated())
				.addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
				.build();
	}
	
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
