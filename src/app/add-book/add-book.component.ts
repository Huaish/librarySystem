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
  public imgSrc: string = "../assets/image/資料庫.jpg";
  public categoryList = categories;
  public form: FormGroup = new FormGroup({
    BookCategory: new FormControl(null, Validators.required),
    BookName: new FormControl("", Validators.required),
    BookAuthor: new FormControl("", Validators.required),
    BookBoughtDate: new FormControl(new Date(), [Validators.required, this.boughtDateValidator()]),
    BookPublisher: new FormControl("", Validators.required)
  });

  public check(field: string, err: string) {
    let formCtr = this.form.get(field);
    return formCtr?.errors?.[err];
  }

  public boughtDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return (control.value > new Date()) ? { boughtDate: true } : null;
    };
  }


  public onCategoryChange(item: any): void {
    this.imgSrc = "../assets/image/" + item.value + ".jpg";
  }

  public onSubmit() {
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    }
  }
}
