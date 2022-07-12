import {Component, OnDestroy, OnInit} from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import {ShoppinglistService} from "./shoppinglist.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css'],
})
export class ShoppinglistComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private ingredientSub: Subscription;

  constructor(private shoppingListService: ShoppinglistService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();

    this.ingredientSub = this.shoppingListService.$ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => this.ingredients = ingredients
    );
  }

  ngOnDestroy(): void {
    this.ingredientSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.$startedEditing.next(index);
  }
}
