import { Component } from '@angular/core';
import { categories } from './data.categories';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public dropDownItems = categories;
  public defaultItem = { text: "語言", value: null };

  clickBtn() {
    console.log("click");
  }
}
