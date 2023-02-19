import { EventEmitter } from '@angular/core';
import { BookService } from './../book.service';
import { Component, Input, Output } from '@angular/core';
import { RemoveEvent } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, filterBy } from '@progress/kendo-data-query';

@Component({
  selector: 'app-book-grid',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-grid.component.css']
})
export class BookGridComponent {
  constructor(private bookService: BookService) { }

  @Input() public gridData: unknown[] = [];
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

  public search(value: string): void {
    //if value length < 2, return all data
    if (value.length < 2) {
      this.gridData = this.bookService.get();
      return;
    }
    // search by BookName contains value words and not case sensitive
    this.gridData = this.bookService.get().filter((item: any) => {
      return item.BookName.toLowerCase().includes(value.toLowerCase());
    }
    );
  }

}

