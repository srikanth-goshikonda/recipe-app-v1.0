import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/model-global/shared.module';
import { AuthComponent } from './auth.component';
const routes = [{ path: ':id', component: AuthComponent }];
@NgModule({
  declarations: [AuthComponent],
  imports: [FormsModule, RouterModule.forChild(routes), SharedModule],
  exports: [CommonModule, FormsModule],
})
export class AuthModule {}
