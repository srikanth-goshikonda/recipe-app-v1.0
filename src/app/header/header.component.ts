import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { EventService } from '../services/event.service';
import { ModalService } from '../services/modal.service';
import { ShoppingService } from '../services/shopping.service';
import { PlaceholderDirective } from '../shared/model-global/placeholder.directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  selectedFeature: string = 'recipe';
  isAuthenticated: boolean = false;
  shoppingCart: number = 0;
  @ViewChild(PlaceholderDirective) appPlaceholder: PlaceholderDirective;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private modalService: ModalService,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.authService.userSubject.subscribe((user) => {
      this.isAuthenticated = user != null ? true : false;
    });

    this.shoppingService.ingsSubject.subscribe((x) => {
      this.shoppingCart = this.shoppingService.ingredients.length;
    });
  }
  onSelect(feature: string) {
    this.selectedFeature = feature;
    this.eventService.eventEmit.emit(feature);
  }
  onLogout() {
    this.authService.logout();
    this.modalService
      .show(false, 'Session Expired!!!', this.appPlaceholder)
      .subscribe((x) => {
        this.modalService.modelView.clear();
      });
  }
}
