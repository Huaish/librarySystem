import { Book } from './../model';
import { Component, Input, Output, EventEmitter, SimpleChanges, HostListener } from '@angular/core';
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
  public gridState: State = { skip: 0, take: 15};
  public searchTerms: string = '';
  public gridHeight = window.innerHeight * 0.7;

  @Input() public gridData: Book[] = [];
  @Output() public gridDataChange = new EventEmitter<Book[]>();

  // 當視窗大小改變時，重新調整表格高度
  @HostListener('window:resize', ['$event'])
  onResize() { this.gridHeight = window.innerHeight * 0.7; }

  // 當父元件傳入的資料更新時，重新過濾資料
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gridData']) {
      this.gridData = changes['gridData'].currentValue;
      this.search();
    }
  }

  // 當表格狀態改變時，更新表格狀態
  public onDataStateChange(state: State): void {
    this.gridState = state;
  }

  // 刪除書籍
  public removeBookHandler(e: RemoveEvent): void {
    if (confirm('確定要刪除「' + e.dataItem['BookName'] + '」嗎?')) {
      this.bookService.remove(e.dataItem.BookId);
      this.gridData = this.bookService.get();
      this.gridDataChange.emit(this.gridData);
    }
    else {
      e.dataItem = null;
    }
  }

  // 搜尋書籍
  public search(): void {
    // 搜尋字串小於2個字，則不進行搜尋
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
    if(filterData.length < (this.gridState.skip||0))  this.gridState.skip = 0; // 如果搜尋結果筆數小於目前頁數，則將頁數設為0
    this.gridData = filterData;
  }
}

