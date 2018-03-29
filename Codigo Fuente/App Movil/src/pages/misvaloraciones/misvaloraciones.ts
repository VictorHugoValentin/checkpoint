import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-list',
  templateUrl: 'misvaloraciones.html'
})
export class MisvaloracionesPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['done-all', 'clock'];

    this.items = [];
    for (let i = 1; i < 30; i++) {
      this.items.push({
        title: 'Valoración ' + i,
        note: 'Fecha ' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(MisvaloracionesPage, {
      item: item
    });
  }
}
