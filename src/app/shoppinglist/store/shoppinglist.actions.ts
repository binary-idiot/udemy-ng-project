import {Action} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";

export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;


export const ADD_INGREDIENT = '[Shopping List] ADD_INGREDIENT';
export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export const ADD_INGREDIENTS = '[Shopping List] ADD_INGREDIENTS';
export class AddIngredients implements Action {
  readonly  type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export const UPDATE_INGREDIENT = '[Shopping List] UPDATE_INGREDIENT';
export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export const DELETE_INGREDIENT = '[Shopping List] DELETE_INGREDIENT';
export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export const START_EDIT = '[Shopping List] START_EDIT';
export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {
  }
}

export const STOP_EDIT = '[Shopping List] STOP_EDIT';
export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}
