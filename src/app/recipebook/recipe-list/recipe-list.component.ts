import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../../model/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  isFetching: boolean = false;
  subjectSub: Subscription;
  httpSub: Subscription;
  error: string;
  constructor(
    private recipeService: RecipeService,
    private acRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipes = this.acRoute.snapshot.data['data'];

    this.isFetching = true;
    this.recipeService.recipeSubject.subscribe((x) => {
      this.recipes = x;
    });
    this.httpSub = this.recipeService.fetchRecipes().subscribe(
      (x) => {
        this.recipes = x;
        this.isFetching = false;
      },
      (error: Error) => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
    this.subjectSub = this.recipeService.subject.subscribe((x) => {
      this.recipeService.fetchRecipes().subscribe((x) => {
        this.recipes = x;
        this.isFetching = false;
      });
    });
  }

  ngOnDestroy() {
    this.subjectSub.unsubscribe();
    this.httpSub.unsubscribe();
  }
}
