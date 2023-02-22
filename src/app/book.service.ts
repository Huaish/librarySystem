import { Injectable } from '@angular/core';
import { Book } from './model';
import { bookData } from '../data/data.book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor() {}

  private data: unknown[] = null !== localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books') || '{}') : bookData;

  // 產生新的書籍編號
  private generateId(): number {
    let id = 1;
    this.data.forEach((item: any) => {
      if (item.BookId >= id) {
        id = item.BookId + 1;
      }
    });
    return id;
  }

  // 取得書籍資料
  public get(): unknown[] {
    return this.data;
  }

  // 新增書籍
  public addNewBook(data: Book): void {
    data.BookId = this.generateId();
    let newBook = new Book(data);
    this.data = this.data.concat([newBook]);
    localStorage.setItem('books', JSON.stringify(this.data));
  }

  // 刪除書籍
  public remove(removeId: number): void {
    this.data = this.data.filter((item: any) => item.BookId !== removeId);
    localStorage.setItem('books', JSON.stringify(this.data));
  }

}
