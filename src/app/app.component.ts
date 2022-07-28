import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import {DialogComponent} from "./component/dialog/dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pet-project-angular-product-crud';

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: "30%"
    });
  }
}
