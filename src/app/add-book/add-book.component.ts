import { categories } from './../data.categories';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
})
export class AddBookComponent {
  @Output() submit: EventEmitter<any> = new EventEmitter();
  protected imgSrc: string = "../assets/image/資料庫.jpg";
  protected categoryList = categories;
  protected form: FormGroup = new FormGroup({
    BookCategory: new FormControl(null, Validators.required),
    BookName: new FormControl("", Validators.required),
    BookAuthor: new FormControl("", Validators.required),
    BookBoughtDate: new FormControl(new Date(), [Validators.required, this.boughtDateValidator()]),
    BookPublisher: new FormControl("", Validators.required)
  });

  check(field: string, err: string) {
    let formCtr = this.form.get(field);
    return formCtr?.errors?.[err];
  }

  boughtDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return (control.value > new Date()) ? { boughtDate: true } : null;
    };
  }


  onCategoryChange(item: any): void {
    this.imgSrc = "../assets/image/" + item.value + ".jpg";
  }

  onSubmit() {
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    }
  }
}
