package com.joao.controller;

import static org.springframework.http.HttpStatus.CREATED;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.joao.model.Book;
import com.joao.repository.BookRepository;
import org.springframework.web.bind.annotation.PutMapping;




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
		if(book.getRented()) {
			book.setRent_date(new Date());
		}
		book.setRegistration_date(new Date());
		return bookRepository.save(book);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Book> findById(@PathVariable Long id) {
		return bookRepository.findById(id)
				.map(a -> ResponseEntity.ok().body(a))
				.orElse(ResponseEntity.notFound().build());
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Book> update(@PathVariable Long id, @RequestBody Book book) {
		Optional<Book> item =  bookRepository.findById(id);
		if(!item.isEmpty() && item.isPresent()) {
			Book recordFound = item.get();
			recordFound.setTitle(book.getTitle());
			recordFound.setAuthor(book.getAuthor());
			recordFound.setIsbn(book.getIsbn());
			recordFound.setPublicationYear(book.getPublicationYear());
			recordFound.setPublisher(book.getPublisher());
			recordFound.setRented(book.getRented());
			Book updatedBook = bookRepository.save(recordFound);
			return ResponseEntity.ok().body(updatedBook);
		}
		return ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		return bookRepository.findById(id)
				.map(item ->{
					bookRepository.deleteById(id);
					return ResponseEntity.noContent().build();
				}).orElse(ResponseEntity.notFound().build());
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<?> rentBook(@PathVariable Long id, @RequestBody Boolean rented){
		return bookRepository.findById(id)
				.map(item ->{
					item.setRented(rented);
					item.setRent_date(rented ? new Date() : null);
					bookRepository.save(item);
					return ResponseEntity.noContent().build();
				}).orElse(ResponseEntity.notFound().build());
	}

}
