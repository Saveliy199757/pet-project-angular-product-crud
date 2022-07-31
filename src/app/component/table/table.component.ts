import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Product} from "../../interfaces/product.interface";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ApiJsonServerService} from "../../servises/api-json-server.service";
import {DialogComponent} from "../dialog/dialog.component";
import {Subject} from "rxjs";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness', 'price', 'comment', 'action'];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private apiJsonServer: ApiJsonServerService) {
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.apiJsonServer.$products.subscribe(res => this.initTableDataSource(res))
  }
  editProduct(row: Product) {
    this.dialog.open(DialogComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe((res) => {
      if (res) {
        let index = this.apiJsonServer.products.findIndex(product => product.id === res.id)
        if (index > -1) {
          this.apiJsonServer.products[index] = res.value;
          this.apiJsonServer.$products.next(this.apiJsonServer.products);
        }
      }
    })
  }
  getAllProducts() {
    this.apiJsonServer.getProduct()
      .subscribe({
        next: (products: Product[]) => {
          this.initTableDataSource(products)
        },
        error: () => {
          alert('Ошибка запроса')
        }
      })
  }
  initTableDataSource(data: any) {
    this.dataSource = new MatTableDataSource<Product>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  deleteProduct(id: number) {
    this.apiJsonServer.deleteProduct(id)
      .subscribe({
        next: () => {
          alert('Продукт удален успешно')
          this.initTableDataSource(this.apiJsonServer.products);
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
