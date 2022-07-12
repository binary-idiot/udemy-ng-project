import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShoppinglistComponent} from "./shoppinglist.component";
import {ShoppinglistEditComponent} from "./shoppinglist-edit/shoppinglist-edit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    ShoppinglistComponent,
    ShoppinglistEditComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: ShoppinglistComponent},]),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ShoppinglistModule { }
