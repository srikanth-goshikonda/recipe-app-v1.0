import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';
import { EventService } from '../services/event.service';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css'],
})
export class ShoppinglistComponent implements OnInit {
  ingredients: Ingredient[] = [];
  constructor(
    private shoppingService: ShoppingService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.shoppingService.ingsSubject.subscribe((x) => (this.ingredients = x));
    this.ingredients = this.shoppingService.fetchIngredients();
    this.eventService.shoppingEvent.subscribe((value) =>
      this.ingredients.push(value)
    );
  }

  onAdd(ing: Ingredient) {
    this.ingredients.push(ing);
  }
  select(index: number) {
    this.shoppingService.shoppingSubject.next(index);
  }
}
