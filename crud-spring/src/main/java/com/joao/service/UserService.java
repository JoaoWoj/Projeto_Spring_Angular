package com.joao.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joao.model.User;
import com.joao.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public List<User> findAll() {
		return userRepository.findAll();
	}
	
	public Integer findAllLength() {
		return userRepository.findAll().size();
	}

	public Optional<User> findById(Long id) {
		return userRepository.findById(id);
	}
	
	public Optional<User> findByLogin(String login) {
		return userRepository.findByLogin(login);
	}

	public User create(User user) {
		return userRepository.save(user);
	}

	public Optional<User> update(Long id, User user) {
		Optional<User> item =  userRepository.findById(id);
		if(!item.isEmpty() && item.isPresent()) {
			User recordFound = item.get();
			recordFound.setLogin(user.getLogin());
			recordFound.setPassword(user.getPassword());
			recordFound.setRole(user.getRole());
			return Optional.of(userRepository.save(recordFound));
		}
		return Optional.empty();
	}

	public boolean delete(Long id) {
		return userRepository.findById(id)
				.map(item ->{
					userRepository.deleteById(id);
					return true;
				}).orElse(false);
	}

}
