import { Subject } from 'rxjs';
import { Ingredient } from '../model/ingredient.model';

export class ShoppingService {
  shoppingSubject: Subject<number> = new Subject<number>();
  ingsSubject: Subject<Ingredient[]> = new Subject<Ingredient[]>();

  ingredients: Ingredient[] = [
    // new Ingredient('Tomatos', 5),
    // new Ingredient('Apple', 25),
    // new Ingredient('Rice', 20),
  ];

  fetchIngredients() {
    this.ingsSubject.next(this.ingredients);
    return this.ingredients.slice();
  }
  fetchIngredient(index: number) {
    return this.ingredients[index];
  }
  addIngredient(ing: Ingredient) {
    this.ingredients.push(ing);

    this.ingsSubject.next(this.ingredients);
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingsSubject.next(this.ingredients);
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingsSubject.next(this.ingredients);
  }
  constructor() {}
}
