import { Component, HostListener } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private bookService: BookService) { }
  public windowWidth = 500;
  public windowHeight = 700;
  public windowTop =  window.innerHeight / 2 - this.windowHeight / 2;
  public windowLeft = window.innerWidth / 2 - this.windowWidth / 2;
  public active = false;
  public gridData: Book[] = this.bookService.get();

  @HostListener('window:resize', ['$event'])
  onResize() { this.adjustWindowPosition(); }

  // 調整視窗位置
  public adjustWindowPosition(): void {
    if (this.windowTop < 0) this.windowTop = 0;
    if (this.windowLeft < 0) this.windowLeft = 0;
    if (this.windowTop + this.windowHeight > window.innerHeight) this.windowTop = window.innerHeight- this.windowHeight;
    if (this.windowLeft + this.windowWidth > window.innerWidth) this.windowLeft = window.innerWidth - this.windowWidth;
  }

  // 切換視窗顯示狀態
  public toggleWindow(state: boolean): void {
    this.adjustWindowPosition();
    this.active = state;
  }

  // 新增書籍
  public addBookHandler(book: Book): void {
    this.bookService.addNewBook(book);
    this.active = false;
    this.gridData = this.bookService.get();
  }
}
