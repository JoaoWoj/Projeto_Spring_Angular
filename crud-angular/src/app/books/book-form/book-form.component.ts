import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BooksService } from '../services/books.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private service: BooksService,
    private snackBar: MatSnackBar){
    this.form = this.formBuilder.group({
      title: [null],
      author: [null],
      isbn: [null],
      publisher: [null],
      rented: [false],
      publicationYear: [null]
    });
  };

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  };

  onSubmit(){
    this.service.save(this.form.value)
    .subscribe(result => console.log(result), error => {
      this.snackBar.open('Erro ao salvar livro.', '', {duration: 5000})
    });
  };

  onCancel(){

  };

}
