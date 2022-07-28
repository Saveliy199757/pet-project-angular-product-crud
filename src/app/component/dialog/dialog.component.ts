import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiJsonServerService} from "../../servises/api-json-server.service";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList = ['New', 'Second Hand'];
  productForm!: FormGroup;

  constructor( private formBuilder: FormBuilder, private apiJsonSever: ApiJsonServerService, private matDialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
    })
  }

  addProduct() {
    if (this.productForm.value) {
      this.apiJsonSever.postProduct(this.productForm.value)
        .subscribe({
          next: () => {
            alert('Продукт добавлен успешно');
            this.productForm.reset();
            this.matDialogRef.close('save');
          },
          error: () => {
            alert('Ошибка добавления!')
          }
        })
    }
  }
}
