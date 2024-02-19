import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit {

  form = this.formBuilder.group({
    title: [''],
    author: [''],
    isbn: [''],
    publisher: [''],
    rented: [false],
    publicationYear: [0]
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: BooksService,
    private snackBar: MatSnackBar,
    private location: Location){
  };

  ngOnInit(): void {
  };

  onSubmit(){
    this.service.save(this.form.value)
    .subscribe(result => this.onSucess(), error => this.onError())
  };

  onCancel(){
    this.location.back();
  };

  private onSucess(){
    this.snackBar.open('Livro salvo com sucesso.', '', {duration: 5000})
    this.onCancel();
  }

  private onError(){
    this.snackBar.open('Erro ao salvar livro.', '', {duration: 5000})
  }

}
