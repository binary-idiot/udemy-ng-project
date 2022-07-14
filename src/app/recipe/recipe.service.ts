import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import * as ShoppingListActions from "../shoppinglist/store/shoppinglist.actions";
import * as fromApp from "../store/app.reducer"
import {Store} from "@ngrx/store";

@Injectable()
export class RecipeService {

  $recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>()

  // private  recipes: Recipe[] = [
  //   new Recipe("Chorizo mozarella gnocchi bake",
  //     "Melty chease and savory chorizo on top of yummy gnocci",
  //     "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg",
  //     [
  //       new Ingredient("mozarella", 2),
  //       new Ingredient("chorizo", 7),
  //       new Ingredient("gnocci", 10),
  //     ]
  //   ),
  //   new Recipe("Tasty glazed salmon",
  //     "The best salmon you've ever had ",
  //     "https://www.saveur.com/uploads/2020/11/20/Y7RZPFZEERAZVHJ2VHC2RXMEEY.jpg",
  //     [
  //       new Ingredient("whole salmon", 5),
  //       new Ingredient("brown sugar", 100),
  //       new Ingredient("honey", 25),
  //       new Ingredient("garlic", 3),
  //       new Ingredient("sesame seeds", 6),
  //       new Ingredient("green onions", 2),
  //       new Ingredient("mr manns a-mazing do-it-all spicer-upper mix", 1),
  //     ]
  //   )
  // ]

  private recipes: Recipe[] = []

  constructor(private store: Store<fromApp.AppState>) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.$recipesChanged.next(this.getRecipes());
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(recipe: Recipe) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(recipe.ingredients))
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.$recipesChanged.next(this.getRecipes());
  }

  updateRecipe(index: number, recipe:Recipe) {
    this.recipes[index] = recipe;
    this.$recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.$recipesChanged.next(this.getRecipes())
  }
}
