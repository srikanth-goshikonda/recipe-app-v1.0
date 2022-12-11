import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppinglistComponent } from './shoppinglist.component';

@NgModule({
  declarations: [ShoppinglistComponent, ShoppingEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ShoppinglistComponent }]),
  ],
  providers: [],
})
export class ShoppingModule {}
