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
  public screenWidth = window.innerWidth;
  public screenHeight = window.innerHeight;
  public width = 500;
  public height = 700;
  public windowTop = this.screenHeight / 2 - this.height / 2;
  public windowLeft = this.screenWidth / 2 - this.width / 2;
  public active = false;
  public gridData: unknown[] = this.bookService.get();

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  public open(e: MouseEvent): void {
    this.windowTop = this.screenHeight / 2 - this.height / 2;
    this.windowLeft = this.screenWidth / 2 - this.width / 2;
    this.active = true;
  }

  public close(): void {
    this.active = false;
  }

  public onDragEnd(): void {
    if (this.windowTop < 0) this.windowTop = 0;
    if (this.windowLeft < 0) this.windowLeft = 0;
    if (this.windowTop + this.height > this.screenHeight) this.windowTop = this.screenHeight - this.height;
    if (this.windowLeft + this.width > this.screenWidth) this.windowLeft = this.screenWidth - this.width;
  }

  public onSubmit(e: Book): void {
    this.bookService.addNewBook(e);
    this.active = false;
    this.gridData = this.bookService.get();
  }
}
