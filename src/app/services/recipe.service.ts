import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recipe } from '../model/recipe.model';

@Injectable()
export class RecipeService {
  private apiEndPoint = environment.apiEndPoint;
  private recipes: Recipe[] = [];
  recipeSubject: Subject<Recipe[]> = new Subject<Recipe[]>();

  constructor(private httpClient: HttpClient) {}

  subject: Subject<Recipe[]> = new Subject<Recipe[]>();

  fetchRecipe(key: string): Observable<Recipe> {
    return this.httpClient.get<Recipe>(this.apiEndPoint + '/' + key + '.json');
  }

  fetchRecipes() {
    return this.httpClient.get<Recipe[]>(this.apiEndPoint + '.json').pipe(
      map((x) => {
        const recipes: Recipe[] = [];
        for (const key in x) {
          recipes.push({ ...x[key], key });
        }
        this.recipes = recipes;
        return recipes;
      })
    );
  }

  postRecipe(recipe: Recipe) {
    return this.httpClient.post(this.apiEndPoint + '.json', recipe).pipe(
      tap((x: { name: string }) => {
        console.log(x);
        recipe.key = x.name;
        this.recipes.push(recipe);
        this.recipeSubject.next(this.recipes);
      })
    );
  }

  putRecipe(key: string, recipe: Recipe) {
    return this.httpClient
      .put(this.apiEndPoint + '/' + key + '.json', recipe)
      .pipe(
        tap((x) => {
          this.recipes = this.recipes.map((y: Recipe) => {
            if (y.key === key) {
              y = recipe;
              y.key = key;
            }
            return y;
          });

          this.recipeSubject.next(this.recipes);
        })
      );
  }
  deleteRecipe(key: string) {
    this.recipes = this.recipes.filter((x) => {
      return x.key !== key;
    });
    this.recipeSubject.next(this.recipes);
    return this.httpClient.delete(this.apiEndPoint + '/' + key + '.json');
  }
}
