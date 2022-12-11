import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { ShoppingService } from 'src/app/services/shopping.service';
import { Ingredient } from '../../model/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f')
  form: NgForm;
  editMode: boolean = false;
  editIndex: number;
  private subjectSub: Subscription;
  constructor(
    private eventService: EventService,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.subjectSub = this.shoppingService.shoppingSubject.subscribe((x) => {
      let ing = this.shoppingService.fetchIngredient(x);
      this.editIndex = x;
      this.form.setValue({
        name: ing.name,
        amount: ing.amount,
      });
      this.editMode = true;
    });
  }

  onAdd(formData: NgForm) {
    if (!this.editMode) {
      this.eventService.shoppingEvent.emit(
        new Ingredient(formData.value.name, parseInt(formData.value.amount))
      );
    } else {
      this.shoppingService.updateIngredient(
        this.editIndex,
        new Ingredient(formData.value.name, formData.value.amount)
      );
    }
    this.editMode = false;
    this.form.reset();
  }
  onSubmit(ngForm: NgForm) {
    console.log('X Submit');
  }
  ngOnDestroy() {
    this.subjectSub.unsubscribe();
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.editIndex);
    this.form.reset();
  }
}
