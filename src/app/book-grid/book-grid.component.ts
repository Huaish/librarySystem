import { Component, HostListener } from '@angular/core';
import { bookData } from '../data.book';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { RemoveEvent, CreateFormGroupArgs, AddEvent } from '@progress/kendo-angular-grid';
import { Book } from '../model';

@Component({
  selector: 'app-book-grid',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-grid.component.css']
})
export class BookGridComponent {
  public gridData: unknown[] = bookData;
  public formGroup: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    console.log(args);
    const item = args.isNew ? new Book() : args.dataItem;
    this.formGroup = this.formBuilder.group({
      'BookId': [item.BookId],
      'BookCategory': [item.BookCategory, Validators.required],
      'BookName': [item.BookName, Validators.required],
      'BookAuthor': [item.BookAuthor, Validators.required],
      'BookBoughtDate': [item.BookBoughtDate, Validators.required],
      'BookPublisher': [item.BookPublisher, Validators.required]
    });

    return this.formGroup;
  }

  public removeHandler(e: RemoveEvent): void {
    if (confirm('確定要刪除「' + e.dataItem['BookName'] + '」嗎?')) {
      this.gridData = this.gridData.filter((item: any) => item.BookId !== e.dataItem.BookId);
    }
    else {
      e.dataItem = null;
    }
  }

  public addDataItem: Book | undefined;
  public isNew: boolean = false;
  public opened: boolean = false;

  public addHandler(e: MouseEvent): void {
    e.preventDefault();
    this.addDataItem = new Book();
    this.addDataItem.BookId = this.gridData.length + 1;
    this.opened = true;
    this.gridData = this.gridData.concat([this.addDataItem]);

  }

  public cancelHandler(): void {
    this.addDataItem = undefined;
  }

  public editHandler(args: AddEvent): void {
    this.addDataItem = args.dataItem;
    this.isNew = false;
  }

}

