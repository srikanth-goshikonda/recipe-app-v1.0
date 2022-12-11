import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuradService } from '../services/auth-guard.service';
import { RecipeResolverService } from '../services/recipe-resolver.service';
import { RecipeService } from '../services/recipe.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipebookComponent } from './recipebook.component';

const routes: Routes = [
  {
    path: '',
    component: RecipebookComponent,
    canActivate: [AuthGuradService],
    children: [
      { path: 'add', component: RecipeEditComponent },
      {
        path: 'list',
        component: RecipeListComponent,
        resolve: { data: RecipeResolverService },
      },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RecipeService],
})
export class RecipeRoutingModule {}
