import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private readonly API = 'api/books';

  constructor(private httpClient: HttpClient) {

  }

  private readonly token = localStorage.getItem('token');

  findAll() {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' +this.token} );
    return this.httpClient.get<Book[]>(this.API,{headers});
  }

  findById(id: number){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' +this.token} );
    return this.httpClient.get<Book>(`${this.API}/${id}`,{headers});
  }

  save(book: Partial<Book>){
    if(book._id){
      return this.update(book);
    }
    return this.create(book);
  }

  private create(book: Partial<Book>){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' +this.token} );
    return this.httpClient.post<Book>(this.API, book,{headers});

  }

  private update(book: Partial<Book>){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' +this.token} );
    return this.httpClient.put<Book>(`${this.API}/${book._id}`, book,{headers});
  }

  delete(id: number){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' +this.token} );
    return this.httpClient.delete(`${this.API}/${id}`,{headers});
  }

  rentBook(id:number, rented:boolean){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' +this.token} );
    return this.httpClient.patch(`${this.API}/${id}`, rented,{headers});
  }

}
