package com.joao;

import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.joao.model.Book;
import com.joao.model.User;
import com.joao.model.enumerators.UserRoleEnum;
import com.joao.repository.BookRepository;
import com.joao.repository.UserRepository;

@SpringBootApplication
@ComponentScan({ "com.joao.*" })
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}
	
	@Bean
	CommandLineRunner initDatabase(BookRepository bookRepository, UserRepository userRepository) {
		return args-> {
			bookRepository.deleteAll();
			Book book = new Book();
			book.setTitle("O homem mais rico da babilôia");
			book.setAuthor("George S. Clason");
			book.setRegistration_date(new Date());
			book.setIsbn("9788595081536");
			book.setPublisher("Haper Collins Brasil");
			book.setRent_date(null);
			book.setRented(false);
			book.setPublicationYear(2021);
			bookRepository.save(book);
			Book book2 = new Book();
			book2.setTitle("Eu, Robô");
			book2.setAuthor("Isaac Asimov");
			book2.setRegistration_date(new Date());
			book2.setIsbn("9788576572008");
			book2.setPublisher("Aleph");
			book2.setRent_date(new Date());
			book2.setRented(true);
			book2.setPublicationYear(2014);
			bookRepository.save(book2);
			
			userRepository.deleteAll();
			User user = new User("admin", "admin", UserRoleEnum.ADMIN);
			String encrypetedPassword = new BCryptPasswordEncoder().encode(user.getPassword());
			User newUser = new User(user.getLogin(), encrypetedPassword, user.getRole());
			
			userRepository.save(newUser);
		};
	}

}
