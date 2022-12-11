import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { ModalService } from 'src/app/services/modal.service';
import { PlaceholderDirective } from 'src/app/shared/model-global/placeholder.directive';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective, { static: true })
  placeholder: PlaceholderDirective;
  recipeServiceSubscriber: Subscription;
  id: string;
  editMode: boolean = false;
  recipeForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    imgPath: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    ingredients: new FormArray([]),
  });

  constructor(
    private route: ActivatedRoute,
    private reciepService: RecipeService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((x) => {
      (this.id = x['id']), (this.editMode = x['id'] != null);
      if (this.editMode) {
        this.formInit();
      }
    });
  }

  ngOnDestroy() {
    this.recipeServiceSubscriber?.unsubscribe();
  }
  onSave() {
    if (this.editMode) {
      this.recipeServiceSubscriber = this.reciepService
        .putRecipe(this.id, this.recipeForm.value)
        .subscribe((x) => {
          this.modalService
            .show(false, 'Recipe Updated Successfully', this.placeholder)
            .subscribe((status) => {
              this.router.navigate(['../']);
              this.modalService.modelView.clear();
            });
        });
    } else {
      this.recipeServiceSubscriber = this.reciepService
        .postRecipe(this.recipeForm.value)
        .subscribe((x) => {
          this.modalService
            .show(false, 'Recipe Added Successfully', this.placeholder)
            .subscribe((status) => {
              this.router.navigate(['../']);
              this.modalService.modelView.clear();
            });
        });
    }
  }

  private formInit() {
    this.reciepService.fetchRecipe(this.id).subscribe((x) => {
      x.ingredients?.forEach((x) => {
        (this.recipeForm.get('ingredients') as FormArray).push(
          new FormGroup({
            name: new FormControl(null, Validators.required),
            amount: new FormControl(null, Validators.required),
          })
        );
      });

      this.recipeForm.setValue({
        name: x.name,
        imgPath: x.imgPath,
        description: x.description,
        ingredients: x.ingredients == undefined ? [] : x.ingredients,
      });
    });
  }

  getFormArray() {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  addIngredientControl() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, Validators.required),
      })
    );
  }

  closeIngredientControl(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }
}
