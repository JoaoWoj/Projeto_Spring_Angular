package com.joao.controller;

import static org.springframework.http.HttpStatus.CREATED;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.joao.model.Book;
import com.joao.service.BookService;

import jakarta.validation.Valid;

@Validated
@RestController
@RequestMapping("/api/books")
public class BooksController {

	private final BookService bookService;

	public BooksController(BookService bookService) {
		this.bookService = bookService;
	}

	@GetMapping
	public List<Book> findAll() {
		return bookService.findAll();
	}

	@PostMapping
	@ResponseStatus(code = CREATED)
	public Book create(@RequestBody @Valid Book book) {
		return bookService.create(book);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Book> findById(@PathVariable Long id) {
		return bookService.findById(id).map(a -> ResponseEntity.ok().body(a)).orElse(ResponseEntity.notFound().build());
	}

	@PutMapping("/{id}")
	public ResponseEntity<Book> update(@PathVariable Long id, @RequestBody @Valid Book book) {
		return bookService.update(id, book).map(item -> ResponseEntity.ok().body(item))
				.orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		if(bookService.delete(id)) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PatchMapping("/{id}")
	public ResponseEntity<?> rentBook(@PathVariable Long id, @RequestBody Boolean rented) {
		if(bookService.rentBook(id, rented)) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
