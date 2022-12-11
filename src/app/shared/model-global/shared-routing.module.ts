import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorPageComponent } from 'src/app/error-page.component/error-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '**', component: ErrorPageComponent }]),
  ],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
