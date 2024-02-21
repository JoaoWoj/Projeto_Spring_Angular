import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Book } from '../../interfaces/book';

@Component({
  selector: 'app-form-book',
  templateUrl: './form-book.component.html',
  styleUrl: './form-book.component.css'
})
export class FormBookComponent implements OnInit {
  currentRoute = '';
  form = this.formBuilder.group({
    _id: 0,
    title: ['', [Validators.required, Validators.maxLength(200)]],
    author: ['', [Validators.required, Validators.maxLength(200)]],
    isbn: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(20)],
    ],
    publisher: ['', [Validators.required, Validators.maxLength(200)]],
    rented: [false],
    publicationYear: [
      0,
      [Validators.required, Validators.min(1), Validators.max(9999)],
    ],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: BooksService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const book: Book = this.route.snapshot.data['book'];
    this.currentRoute = this.route.snapshot.url[0].path;
    this.form.setValue({
      _id: book._id,
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publisher: book.publisher,
      rented: book.rented,
      publicationYear: book.publicationYear,
    });
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 200;
      return `Tamanho máximo de ${requiredLength} caracteres excedido.`;
    }

    if (field?.hasError('min')) {
      return 'O ano de publicação deve ser a partir do ano 1.';
    }

    if (field?.hasError('max')) {
      return 'O ano de publicação não deve exceder 9999 anos.';
    }

    return 'Campo inválido';
  }

  getErrorMessageIsbn() {
    const field = this.form.get('isbn');
    if (field?.hasError('maxlength')) {
      return `Tamanho máximo de 20 caracteres excedido.`;
    }
    if (field?.hasError('minlength')) {
      return `Tamanho mínimo precisa ser de 10 caracteres.`;
    }
    return 'Campo inválido';
  }

  onSubmit() {
    const { author, isbn, publicationYear, publisher, title } = this.form.value;

    if (!author || !isbn || !publicationYear || !publisher || !title) {
      this.snackBar.open('Não é possível salvar livro com dados vazios.', 'X', {
        duration: 5000,
      });
    } else if (isNaN(Number(isbn))) {
      this.snackBar.open('ISBN deve conter apenas números.', 'X', {
        duration: 5000,
      });
    } else {
      this.service.save(this.form.value).subscribe(
        () => this.onSucess(),
        () => this.onError()
      );
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSucess() {
    this.snackBar.open('Livro salvo com sucesso.', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar livro.', '', { duration: 5000 });
  }
}
