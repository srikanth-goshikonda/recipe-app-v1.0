import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/model/recipe.model';
import { ModalService } from 'src/app/services/modal.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppingService } from 'src/app/services/shopping.service';
import { PlaceholderDirective } from 'src/app/shared/model-global/placeholder.directive';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  recipeSubscribe: Subscription;
  isFetching: boolean = false;
  error: string;
  @ViewChild(PlaceholderDirective) appPlaceholder: PlaceholderDirective;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shoppingService: ShoppingService,
    private recipeService: RecipeService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((id) => {
      this.isFetching = true;
      this.recipeSubscribe = this.recipeService.fetchRecipe(id['id']).subscribe(
        (recipe: Recipe) => {
          this.recipe = recipe;
          this.recipe.key = id['id'];
          this.isFetching = false;
        },
        (error: Error) => {
          this.isFetching = false;
          this.error = error.message;
        }
      );
    });
  }
  ngOnDestroy(): void {
    this.recipeSubscribe.unsubscribe();
  }
  toShoppingList(recipe: Recipe) {
    recipe.ingredients.forEach((x) => this.shoppingService.addIngredient(x));
    this.modalService
      .show(false, 'Added to shopping list!', this.appPlaceholder)
      .subscribe((x) => {
        this.modalService.modelView.clear();
      });
  }

  onDelete(key: string) {
    console.log(this.appPlaceholder);

    this.modalService
      .show(true, 'Are you sure?', this.appPlaceholder)
      .subscribe((x) => {
        if (x) {
          this.recipeSubscribe = this.recipeService
            .deleteRecipe(key)
            .subscribe((x) => {
              this.router.navigate(['../']);
            });
          this.modalService.modelView.clear();
        } else {
          this.modalService.modelView.clear();
        }
      });
  }
}
