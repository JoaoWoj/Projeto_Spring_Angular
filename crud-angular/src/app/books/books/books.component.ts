import { BooksService } from './../services/books.service';
import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {

  books$: Observable<Book[]>;
  readonly displayedColumns = ['title', 'author', 'publisher', 'rented', 'action'];


  constructor(private booksService: BooksService, private router: Router, private route: ActivatedRoute) {
    this.books$ = this.booksService.findAll();
  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onReturn(book: Book){

  }

  onRent(book: Book){

  }

  onView(book: Book){

  }

  onEdit(book: Book){
    this.router.navigate(['edit', book._id], {relativeTo: this.route});
  }

  onDelete(book: Book){

  }

}
