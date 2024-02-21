package com.joao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joao.model.DTO.AuthenticationDTO;
import com.joao.model.DTO.RegisterDTO;
import com.joao.service.AuthenticationService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("api/auth")
public class AuthenticationController {
	
	@Autowired
	AuthenticationService authService;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody @Valid AuthenticationDTO data) {
		return authService.login(data).map(item -> ResponseEntity.ok().body(item))
				.orElse(ResponseEntity.notFound().build());
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody @Valid RegisterDTO data) {
		return authService.register(data).map(item -> ResponseEntity.ok().body(item))
				.orElse(ResponseEntity.notFound().build());
	}

}
