package com.joao.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joao.model.Book;
import com.joao.repository.BookRepository;

@Service
public class BookService {

	@Autowired
	private BookRepository bookRepository;
	
	public List<Book> findAll() {
		return bookRepository.findAll();
	}

	public Optional<Book> findById(Long id) {
		return bookRepository.findById(id);
	}

	public Book create(Book book) {
		if(book.getRented()) {
			book.setRent_date(new Date());
		}
		book.setRegistration_date(new Date());
		return bookRepository.save(book);
	}

	public Optional<Book> update(Long id, Book book) {
		Optional<Book> item =  bookRepository.findById(id);
		if(!item.isEmpty() && item.isPresent()) {
			Book recordFound = item.get();
			recordFound.setTitle(book.getTitle());
			recordFound.setAuthor(book.getAuthor());
			recordFound.setIsbn(book.getIsbn());
			recordFound.setPublicationYear(book.getPublicationYear());
			recordFound.setPublisher(book.getPublisher());
			recordFound.setRented(book.getRented());
			return Optional.of(bookRepository.save(recordFound));
		}
		return Optional.empty();
	}

	public boolean delete(Long id) {
		return bookRepository.findById(id)
				.map(item ->{
					bookRepository.deleteById(id);
					return true;
				}).orElse(false);
	}

	public boolean rentBook(Long id, Boolean rented) {
		return bookRepository.findById(id)
				.map(item ->{
					item.setRented(rented);
					item.setRent_date(rented ? new Date() : null);
					bookRepository.save(item);
					return true;
				}).orElse(false);
	}

}
