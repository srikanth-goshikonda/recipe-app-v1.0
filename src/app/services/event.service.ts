import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';
import { Recipe } from '../model/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  eventEmit: EventEmitter<string> = new EventEmitter<string>();
  shoppingEvent: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();
  recipeEvent: EventEmitter<Recipe> = new EventEmitter<Recipe>();
}
