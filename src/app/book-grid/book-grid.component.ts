import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { RemoveEvent } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, filterBy, State } from '@progress/kendo-data-query';
import { BookService } from './../book.service';

@Component({
  selector: 'app-book-grid',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-grid.component.css']
})
export class BookGridComponent {
  constructor(private bookService: BookService) { }
  public gridState: State = { skip: 0, take: 20};
  public searchTerms: string = '';

  @Input() public gridData: unknown[] = [];
  @Output() public gridDataChange = new EventEmitter<unknown[]>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gridData']) {
      this.gridData = changes['gridData'].currentValue;
      this.search();
    }
  }

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

  public onDataStateChange(state: State): void {
    this.gridState = state;
  }

  public search(): void {
    if (this.searchTerms.length < 2) {
      this.gridData = this.bookService.get();
      return;
    }

    const filter: CompositeFilterDescriptor = {
      logic: 'or',
      filters: [
        { field: 'BookName', operator: 'contains', value: this.searchTerms },
        { field: 'BookCategory', operator: 'contains', value: this.searchTerms },
        { field: 'BookAuthor', operator: 'contains', value: this.searchTerms },
        { field: 'BookBoughtDate', operator: 'contains', value: this.searchTerms },
        { field: 'BookPublisher', operator: 'contains', value: this.searchTerms },
      ]
    };

    const filterData = filterBy(this.bookService.get(), filter);
    if(filterData.length < (this.gridState.skip||0)) {
      this.gridState.skip = 0;
    }
    this.gridData = filterData;

  }
}

