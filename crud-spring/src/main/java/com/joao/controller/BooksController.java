package com.joao.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joao.model.Book;
import com.joao.repository.BookRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/books")
public class BooksController {
	
	@Autowired
	private BookRepository bookRepository;
	
	@GetMapping(path = "/findAll")
	public List<Book> findAll(){
		return bookRepository.findAll();
	}
	
	@PostMapping("path")
	public String save(@RequestBody String entity) {
		return entity;
	}
	

}
