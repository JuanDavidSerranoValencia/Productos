import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'List', url: 'list-productos', icon: 'List' },
   
  ];
  public labels = [];
  constructor() {}
}
