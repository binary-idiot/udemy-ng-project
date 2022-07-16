import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of, take} from 'rxjs';
import {Recipe} from "./recipe.model";
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "./recipe.service";
import * as fromApp from "../store/app.reducer";
import * as RecipeActions from "./store/recipe.actions";
import {Store} from "@ngrx/store";
import {Actions, ofType} from "@ngrx/effects";

@Injectable({
  providedIn: 'root'
})
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService,
              private recipesService: RecipeService,
              private store: Store<fromApp.AppState>,
              private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> {
    this.store.dispatch(new RecipeActions.FetchRecipes());
    return this.actions$.pipe(
      ofType(RecipeActions.SET_RECIPES),
      take(1)
    );
  }
}
