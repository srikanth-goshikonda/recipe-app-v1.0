import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';
import { PlaceholderDirective } from '../shared/model-global/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  mode: boolean; //true login mode
  errorMessage: string;
  isLoading = false;
  @ViewChild(PlaceholderDirective) appPlaceholder: PlaceholderDirective;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((x) => {
      if (x['id'] === 'login') {
        this.mode = true;
      } else {
        this.mode = false;
      }
    });
  }

  loginForm(form: NgForm) {
    this.authService.signIn(form.value.email, form.value.password).subscribe({
      next: (v) => {
        this.router.navigate(['/recipe']);
      },
      error: (e) => {
        this.errorMessage = e;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  signupForm(form: NgForm) {
    this.authService.signUp(form.value.email, form.value.password).subscribe({
      next: (v) => {
        this.modalService
          .show(false, 'Account has been created', this.appPlaceholder)
          .subscribe((x) => {
            this.errorMessage = null;
            this.modalService.modelView.clear();
            this.router.navigate(['/recipe']);
          });
      },
      error: (e) => {
        this.errorMessage = e;
        this.isLoading = false;
      },
      complete: () => {
        console.info('complete');
        this.isLoading = false;
      },
    });
  }

  auth(form: NgForm) {
    this.isLoading = true;
    if (this.mode) {
      this.loginForm(form);
    } else {
      this.signupForm(form);
    }
  }
}
