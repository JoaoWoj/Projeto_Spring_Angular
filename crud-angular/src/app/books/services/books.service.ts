import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private readonly API = '/assets/books.json';

  constructor(private httpClient: HttpClient) {

  }

  findAll() {
    return this.httpClient.get<Book[]>(this.API);
  }
}
