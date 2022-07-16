import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipe/recipe.service";
import {Recipe} from "../recipe/recipe.model";
import { map, Observable, tap} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as RecipeActions from "../recipe/store/recipe.actions"

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private dbUrl: string = 'https://udemy-ng-project-2259e-default-rtdb.firebaseio.com/';
  private recipeUrl: string = `${this.dbUrl}/recipes.json`;

  constructor(private http: HttpClient,
              private recipesService: RecipeService,
              private store: Store<fromApp.AppState>) { }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();

    this.http.put(
      this.recipeUrl,
      recipes
    ).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipeUrl).pipe(
      map( recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        })
      }),
      tap(
        recipes => {
          this.store.dispatch(new RecipeActions.SetRecipes(recipes));
        }
      )
    )
  }

}
