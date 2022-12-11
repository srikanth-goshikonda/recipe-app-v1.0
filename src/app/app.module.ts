import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ShoppingService } from './services/shopping.service';
import { SharedRoutingModule } from './shared/model-global/shared-routing.module';
import { SharedModule } from './shared/model-global/shared.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  providers: [
    ShoppingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    SharedRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
