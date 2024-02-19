package com.joao.model;

import java.util.Date;
import java.util.Objects;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class Book {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@JsonProperty("_id")
	private Long id;
	
	@NotBlank
	@NotNull
	@Length(max=200)
	@Column(length = 200, nullable = false)
	private String title;
	
	@NotBlank
	@NotNull
	@Length(max=200)
	@Column(length = 200, nullable = false)
	private String author;
	
	@NotBlank
	@NotNull
	@Length(min=10, max=13)
	@Column(length = 20, nullable = false)
	private String isbn;
	
	@NotBlank
	@NotNull
	@Length(max=200)
	@Column(length = 200, nullable = false)
	private String publisher;
	
	@Column(nullable = false)
	private Boolean rented;
	
	private Date registration_date;
	
	private Date rent_date;
	
	private Integer publicationYear;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getIsbn() {
		return isbn;
	}
	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}
	public String getPublisher() {
		return publisher;
	}
	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}
	public Boolean getRented() {
		return rented;
	}
	public void setRented(Boolean rented) {
		this.rented = rented;
	}
	public Date getRent_date() {
		return rent_date;
	}
	public void setRent_date(Date rent_date) {
		this.rent_date = rent_date;
	}
	public Integer getPublicationYear() {
		return publicationYear;
	}
	public void setPublicationYear(Integer publicationYear) {
		this.publicationYear = publicationYear;
	}
	public Date getRegistration_date() {
		return registration_date;
	}
	public void setRegistration_date(Date registration_date) {
		this.registration_date = registration_date;
	}
	@Override
	public int hashCode() {
		return Objects.hash(author, id, isbn, publicationYear, publisher, registration_date, rent_date, rented, title);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Book other = (Book) obj;
		return Objects.equals(author, other.author) && Objects.equals(id, other.id) && Objects.equals(isbn, other.isbn)
				&& Objects.equals(publicationYear, other.publicationYear) && Objects.equals(publisher, other.publisher)
				&& Objects.equals(registration_date, other.registration_date)
				&& Objects.equals(rent_date, other.rent_date) && Objects.equals(rented, other.rented)
				&& Objects.equals(title, other.title);
	}

}
