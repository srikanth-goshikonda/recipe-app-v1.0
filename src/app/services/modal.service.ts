import { Injectable } from '@angular/core';
import { ModalGlobalComponent } from '../shared/model-global/modal-global.component';
import { PlaceholderDirective } from '../shared/model-global/placeholder.directive';

@Injectable({ providedIn: 'root' })
export class ModalService {
  modelView;
  show(mode: boolean, message: string, viewContainer: PlaceholderDirective) {
    this.modelView = viewContainer.viewContainerRef;
    this.modelView.clear();
    const view = this.modelView.createComponent(ModalGlobalComponent);
    view.instance.mode = mode;
    view.instance.message = message;

    // view.instance.event.subscribe((x) => {
    //   this.modelView.clear();
    // });
    return view.instance.event;
  }
}
