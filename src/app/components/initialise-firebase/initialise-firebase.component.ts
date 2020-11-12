import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cleanVariables } from '../../helpers/helper';
import { FirebaseOptions } from '../../models/firebase-options';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-initialise-firebase',
  templateUrl: './initialise-firebase.component.html',
  styleUrls: ['./initialise-firebase.component.css'],
})
export class InitialiseFirebaseComponent {
  configText: string;
  @Input() name: string;
  @Output() projectSet = new EventEmitter<FirebaseOptions>();

  constructor(private service: FirebaseService) {}

  handleConfig(): void {
    this.configText = cleanVariables(this.configText);
  }

  initFirebase(): void {
    const config = this.service.init(this.configText);
    this.projectSet.next(config);
  }
}
