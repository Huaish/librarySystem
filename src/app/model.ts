export class Book {
  public BookId: number;
  public BookCategory: string;
  public BookName: string;
  public BookAuthor: string;
  public BookBoughtDate: Date;
  public BookPublisher: string;

  constructor() {
    this.BookId = 0;
    this.BookCategory = '';
    this.BookName = '';
    this.BookAuthor = '';
    this.BookBoughtDate = new Date();
    this.BookPublisher = '';
  }
}
