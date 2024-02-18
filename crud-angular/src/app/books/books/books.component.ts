import { BooksService } from './../services/books.service';
import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {

  books$: Observable<Book[]>;
  displayedColumns = ['title', 'author', 'publisher', 'publicationYear'];


  constructor(private booksService: BooksService) {
    this.books$ = this.booksService.findAll();
  }

  ngOnInit(): void {
  }

}
