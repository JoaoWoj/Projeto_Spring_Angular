package com.joao.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.joao.infra.security.TokenService;
import com.joao.model.User;
import com.joao.model.DTO.AuthenticationDTO;
import com.joao.model.DTO.LoginResponseDTO;
import com.joao.model.DTO.RegisterDTO;
import com.joao.repository.AuthRepository;

@Service
public class AuthenticationService {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private AuthRepository authRepository;
	
	@Autowired
	private TokenService tokenService;
	
	public Optional<LoginResponseDTO> login(AuthenticationDTO data) {
		var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
		var auth = this.authenticationManager.authenticate(usernamePassword);
		User user = (User) auth.getPrincipal();
		var token = tokenService.generateToke(user);
		return Optional.of(new LoginResponseDTO(token, user.getRole().toString(), user.getId(), user.getLogin()));
	}
	
	public Optional<User> register(RegisterDTO data) {
		if(this.authRepository.findByLogin(data.login()) != null) {
			return Optional.empty();
		}
		String encrypetedPassword = new BCryptPasswordEncoder().encode(data.password());
		User newUser = new User(data.login(), encrypetedPassword, data.role());
		
		return  Optional.of(this.authRepository.save(newUser));
	}

}
