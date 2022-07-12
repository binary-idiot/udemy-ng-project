import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShoppinglistService} from "./shoppinglist/shoppinglist.service";
import {RecipeService} from "./recipe/recipe.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./auth/auth.interceptor";

@NgModule({
  providers: [
    ShoppinglistService,
    RecipeService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
})
export class CoreModule { }
