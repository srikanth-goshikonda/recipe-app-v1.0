import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorPageComponent } from 'src/app/error-page.component/error-page.component';
import { ModalGlobalComponent } from './modal-global.component';
import { PlaceholderDirective } from './placeholder.directive';

@NgModule({
  declarations: [
    ModalGlobalComponent,
    PlaceholderDirective,
    ErrorPageComponent,
  ],
  imports: [CommonModule],
  exports: [
    ModalGlobalComponent,
    CommonModule,
    PlaceholderDirective,
    ErrorPageComponent,
  ],
})
export class SharedModule {}
