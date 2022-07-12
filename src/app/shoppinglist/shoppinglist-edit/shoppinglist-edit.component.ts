import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppinglistService} from "../shoppinglist.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shoppinglist-edit',
  templateUrl: './shoppinglist-edit.component.html',
  styleUrls: ['./shoppinglist-edit.component.css']
})
export class ShoppinglistEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingredientForm') ingredientForm: NgForm;
  editMode: boolean = false;
  editItemIndex: number;
  editItem: Ingredient;
  private editingSub: Subscription;

  constructor(private shoppingListService: ShoppinglistService) {
  }

  onSubmit() {
    const newIngredient: Ingredient = new Ingredient(this.ingredientForm.value.name, this.ingredientForm.value.amount);

    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.onClear();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

  onClear() {
    this.ingredientForm.reset()
    this.editMode = false;
  }

  ngOnInit(): void {
    this.editingSub = this.shoppingListService.$startedEditing.subscribe(
      (index: number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editItem = this.shoppingListService.getIngredient(index);

        this.ingredientForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        })
      }
    );
  }

  ngOnDestroy(): void {
    this.editingSub.unsubscribe();
  }

}

