import { categories } from '../../data/data.categories';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
})
export class AddBookComponent {
  public imgSrc: string = "../assets/image/資料庫.jpg";
  public categoryList = categories;
  public form: FormGroup = new FormGroup({
    BookCategory: new FormControl(null, Validators.required),
    BookName: new FormControl("", Validators.required),
    BookAuthor: new FormControl("", Validators.required),
    BookBoughtDate: new FormControl(new Date(), [Validators.required, this.boughtDateValidator()]),
    BookPublisher: new FormControl("", Validators.required)
  });

  @Output() submit: EventEmitter<any> = new EventEmitter();

  // 檢查欄位是否有錯誤及錯誤類型
  public check(field: string, err: string) {
    let formCtr = this.form.get(field);
    return formCtr?.errors?.[err];
  }

  // 檢查購買日期是否大於今天
  public boughtDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return (control.value > new Date()) ? { boughtDate: true } : null;
    };
  }

  // 當選擇類別時，更新圖片
  public onCategoryChange(item: any): void {
    this.imgSrc = "../assets/image/" + item.value + ".jpg";
  }

  // 當按下送出按鈕時，檢查表單是否有效，若有效則傳送表單資料
  public onSubmit() {
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    }
  }
}
