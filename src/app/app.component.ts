import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import {DialogComponent} from "./component/dialog/dialog.component";
import {ApiJsonServerService} from "./servises/api-json-server.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Product} from './interfaces/product.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness', 'price', 'comment', 'action'];
  dataSource!: MatTableDataSource<Product>;
  products: Product[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private apiJsonServer: ApiJsonServerService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: "30%"
    }).afterClosed().subscribe(value => {
      if (value) {
        this.products = [ ...this.products, value ];
        this.initTableDataSource(this.products)
      }
    });
  }
  editProduct(row: Product) {
    this.dialog.open(DialogComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe(res => {
      if (res) {
        let index = this.products.findIndex(item => item.id === res.id)
        if (index > -1) {
          this.products[index] = res.value;
          this.initTableDataSource(this.products)
        }
      }
    })
  }
  getAllProducts() {
    this.apiJsonServer.getProduct()
      .subscribe({
        next: (res: any) => {
          this.products = res;
          this.initTableDataSource(this.products)
        },
        error: () => {
          alert('Ошибка запроса')
        }
      })
  }
  initTableDataSource(data: Product[]) {
    this.dataSource = new MatTableDataSource<Product>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  deleteProduct(id: number) {
    this.apiJsonServer.deleteProduct(id)
      .subscribe({
        next: () => {
          alert('Продукт удален успешно')
          this.products = this.products.filter(product => product.id !== id);
          this.initTableDataSource(this.products);
        },
        error: () => {
          alert('Ошибка удаления')
        }
      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
