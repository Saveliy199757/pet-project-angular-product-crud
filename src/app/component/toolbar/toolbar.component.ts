import {ChangeDetectionStrategy, Component, OnInit, EventEmitter,  Output} from '@angular/core';
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Product} from "../../interfaces/product.interface";
import {ApiJsonServerService} from "../../servises/api-json-server.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {
  @Output() productAdd: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(public dialog: MatDialog, private apiJsonServer: ApiJsonServerService) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: "30%"
    }).afterClosed().subscribe(value => {
      if (value) {
        this.apiJsonServer.products.push(value);
        this.apiJsonServer.$products.next(this.apiJsonServer.products);
      }
    });
  }
}
