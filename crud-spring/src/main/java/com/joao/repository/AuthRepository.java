package com.joao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.joao.model.User;

public interface AuthRepository extends JpaRepository<User, Long> {
	
	UserDetails findByLogin(String login);

}
