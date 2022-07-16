﻿import {Action} from "@ngrx/store";
import {Recipe} from "../recipe.model";

export const SET_RECIPES = "[Recipes] SET_RECIPES";
export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export const FETCH_RECIPES = '[Recipes] FETCH_RECIPES';
export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export type RecipeActions =
  | SetRecipes
  | FetchRecipes;
