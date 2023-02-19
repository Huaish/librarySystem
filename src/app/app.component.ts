import { Component, HostListener } from '@angular/core';
import { categories } from './data.categories';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public screenWidth = window.innerWidth;
  public screenHeight = window.innerHeight;
  public width = 500;
  public height = 700;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  public opened = false;
  public close(): void {
    this.opened = false;
  }

  public windowTop = this.screenHeight/2 - this.height/2;
  public windowLeft = this.screenWidth/2 - this.width/2;
  public open(e: MouseEvent): void {
    this.windowTop = this.screenHeight/2 - this.height/2;
    this.windowLeft = this.screenWidth/2 - this.width/2;
    this.opened = true;
  }

  public dragEnd(): void {
    if(this.windowTop < 0) this.windowTop = 0;
    if(this.windowLeft < 0) this.windowLeft = 0;
    if(this.windowTop + this.height > this.screenHeight) this.windowTop = this.screenHeight - this.height;
    if(this.windowLeft + this.width > this.screenWidth) this.windowLeft = this.screenWidth - this.width;
  }

  public dropDownItems = categories;
  public defaultItem = { text: "語言", value: null };

  clickBtn() {
    console.log("click");
  }
}
