package com.joao.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joao.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	Optional<User> findByLogin(String login);

}
