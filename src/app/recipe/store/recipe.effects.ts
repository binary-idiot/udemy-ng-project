import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as RecipeActions from "./recipe.actions";
import {map, of, switchMap, withLatestFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipe.model";
import {Injectable} from "@angular/core";
import * as fromApp from "../../store/app.reducer";
import {Store} from "@ngrx/store";

const recipesUrl: string = 'https://udemy-ng-project-2259e-default-rtdb.firebaseio.com/recipes.json'

@Injectable()
export class RecipeEffects {
  fetchRecipes = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipeActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          recipesUrl
        );
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
      map(recipes => {
        return new RecipeActions.SetRecipes(recipes);
      })
    );
  })

  storeRecipes = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipeActions.STORE_RECIPES),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([actionData, recipeData]) => {
        return this.http.put(
          recipesUrl,
          recipeData.recipes
        )
      })
    )
  }, {dispatch: false})

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromApp.AppState>) {}
}
