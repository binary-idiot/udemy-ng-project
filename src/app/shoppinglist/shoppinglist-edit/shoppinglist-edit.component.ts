import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from "../store/shoppinglist.actions"
import * as fromShoppingList from "../store/shoppinglist.reducer"

@Component({
  selector: 'app-shoppinglist-edit',
  templateUrl: './shoppinglist-edit.component.html',
  styleUrls: ['./shoppinglist-edit.component.css']
})
export class ShoppinglistEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingredientForm') ingredientForm: NgForm;
  editMode: boolean = false;
  editItem: Ingredient;
  private editingSub: Subscription;

  constructor(private store: Store<fromShoppingList.AppState>) {
  }

  onSubmit() {
    const newIngredient: Ingredient = new Ingredient(this.ingredientForm.value.name, this.ingredientForm.value.amount);

    if(this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient))
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }

    this.onClear();
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  onClear() {
    this.ingredientForm.reset()
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  ngOnInit(): void {
    this.editingSub = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editItem = stateData.editedIngredient;
        this.ingredientForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.editingSub.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}

