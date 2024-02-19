package com.joao;

import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.joao.model.Book;
import com.joao.repository.BookRepository;

@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}
	
	@Bean
	CommandLineRunner initDatabase(BookRepository bookRepository) {
		return args-> {
			bookRepository.deleteAll();
			Book book = new Book();
			book.setTitle("Teste");
			book.setAuthor("Pedro");
			book.setRegistration_date(new Date());
			book.setIsbn("125.523.621");
			book.setPublisher("Intrinseca");
			book.setRent_date(null);
			book.setRented(false);
			book.setPublicationYear(2024);
			bookRepository.save(book);
			Book book2 = new Book();
			book2.setTitle("Teste");
			book2.setAuthor("Pedro");
			book2.setRegistration_date(new Date());
			book2.setIsbn("125.523.621");
			book2.setPublisher("Intrinseca");
			book2.setRent_date(new Date());
			book2.setRented(true);
			book2.setPublicationYear(2024);
			bookRepository.save(book2);
		};
	}

}
