package com.joao.controller;

import static org.springframework.http.HttpStatus.CREATED;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.joao.model.Book;
import com.joao.repository.BookRepository;


@RestController
@RequestMapping("/api/books")
public class BooksController {
	
	@Autowired
	private BookRepository bookRepository;
	
	@GetMapping
	public List<Book> findAll(){
		return bookRepository.findAll();
	}
	
	@PostMapping
	@ResponseStatus(code=CREATED)
	public Book create(@RequestBody Book book) {
		System.out.println(book);
		book.setRegistration_date(new Date());
		return bookRepository.save(book);
	}
	

}
