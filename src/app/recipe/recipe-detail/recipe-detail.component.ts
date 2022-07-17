import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import * as fromApp from "../../store/app.reducer";
import {Store} from "@ngrx/store";
import {map, switchMap} from "rxjs";
import * as RecipeActions from "../store/recipe.actions";
import * as ShoppingListActions from "../../shoppinglist/store/shoppinglist.actions";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(params => +params['id']),
        switchMap(id => {
          this.id = id;
          return this.store.select('recipes')
        }),
        map(recipesState =>
          recipesState.recipes.find((recipe, index) => index === this.id)
        )
      )
      .subscribe(recipe => {
        this.recipe = recipe;
      }
    )
  }

  onToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit']);
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes'])
  }
}
