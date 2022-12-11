import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-model-global',
  templateUrl: './modal-global.component.html',
  styleUrls: ['./modal-global.component.css'],
})
export class ModalGlobalComponent implements OnInit {
  @Input() mode: boolean; //  true='CONFIRM, false=INFO';
  @Input() message: string;
  @Output() event: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  onCancel() {
    this.event.emit(false);
  }
  onSave() {
    this.event.emit(true);
  }
}
