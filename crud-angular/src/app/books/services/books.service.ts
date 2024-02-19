import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private readonly API = 'api/books';

  constructor(private httpClient: HttpClient) {

  }

  findAll() {
    return this.httpClient.get<Book[]>(this.API);
  }

  findById(id: number){
    return this.httpClient.get<Book>(`${this.API}/${id}`);
  }

  save(book: Partial<Book>){
    if(book._id){
      return this.update(book);
    }
    return this.create(book);
  }

  private create(book: Partial<Book>){
    return this.httpClient.post<Book>(this.API, book);

  }

  private update(book: Partial<Book>){
    return this.httpClient.put<Book>(`${this.API}/${book._id}`, book);
  }

  delete(id: number){
    return this.httpClient.delete(`${this.API}/${id}`);
  }

}
