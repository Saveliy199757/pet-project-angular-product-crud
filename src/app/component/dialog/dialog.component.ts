import {Component, Inject, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiJsonServerService} from "../../servises/api-json-server.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList = ['New', 'Second Hand'];
  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiJsonSever: ApiJsonServerService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private matDialogRef: MatDialogRef<DialogComponent>,
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: [this.editData ? this.editData.productName : '', Validators.required],
      category: [this.editData ? this.editData.category : '', Validators.required],
      date: [this.editData ? this.editData.date : '', Validators.required],
      freshness: [this.editData ? this.editData.freshness : '', Validators.required],
      price: [this.editData ? this.editData.price : '', Validators.required],
      comment: [this.editData ? this.editData.comment : '', Validators.required],
    })
  }

  addProduct() {
      this.apiJsonSever.postProduct(this.productForm.value)
        .subscribe({
          next: () => {
            alert('Продукт добавлен успешно');
            this.matDialogRef.close(this.productForm.value);
            this.productForm.reset();
          },
          error: () => {
            alert('Ошибка добавления!')
          }
        })
  }
  saveProduct() {
    this.apiJsonSever.putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: () => {
          alert("Продукт обновлен.");
          let resSaveData = {
            value: this.productForm.value,
            id: this.editData.id
          }
          this.matDialogRef.close(resSaveData);
          this.productForm.reset();
        },
        error: () => {
          alert("Ошибка обновления");
        }
      })
  }
}
