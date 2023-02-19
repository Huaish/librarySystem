import { EventEmitter } from '@angular/core';
import { bookData } from './../data.book';
import { BookService } from './../book.service';
import { Component, Input, Output } from '@angular/core';
import { RemoveEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-book-grid',
  templateUrl: './book-grid.component.html',
})
export class BookGridComponent {
  constructor(private bookService: BookService) {
    this.gridData = [];
  }


  // public gridData: unknown[] = this.bookService.get();

  @Input() public gridData: unknown[];
  @Output() public gridDataChange = new EventEmitter<unknown[]>();

  public removeHandler(e: RemoveEvent): void {
    if (confirm('確定要刪除「' + e.dataItem['BookName'] + '」嗎?')) {
      this.bookService.remove(e.dataItem.BookId);
      this.gridData = this.bookService.get();
      this.gridDataChange.emit(this.gridData);
    }
    else {
      e.dataItem = null;
    }
  }
}

