import { formatDate } from '@angular/common';
export class Book {
  public BookId: number;
  public BookCategory: string;
  public BookName: string;
  public BookAuthor: string;
  public BookBoughtDate: string;
  public BookPublisher: string;

  constructor(data: Book | null) {
    this.BookId = data?.BookId || 0;
    this.BookCategory = data?.BookCategory || '';
    this.BookName = data?.BookName || '';
    this.BookAuthor = data?.BookAuthor || '';
    this.BookBoughtDate = formatDate(data?.BookBoughtDate || new Date(), 'yyyy-MM-dd', 'en');
    this.BookPublisher = data?.BookPublisher || '';

  }
}
