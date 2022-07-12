import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RecipeComponent} from "./recipe.component";
import {AuthGuard} from "../auth/auth.guard";
import {NoRecipeComponent} from "./no-recipe/no-recipe.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipesResolver} from "./recipes.resolver";

const routes: Routes = [
  {path: '', component: RecipeComponent, canActivate:[AuthGuard], children: [
      {path: '', component: NoRecipeComponent, pathMatch: 'full'},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolver]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolver]}
    ]},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule { }
