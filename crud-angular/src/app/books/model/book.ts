export interface Book {
  _id: number;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  rented: boolean;
  registration_date: Date;
  rent_date: Date;
  publicationYear: number;
}
