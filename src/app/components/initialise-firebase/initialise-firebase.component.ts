import {Component, Input} from '@angular/core';
import { cleanVariables } from '../../helpers/helper';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-initialise-firebase',
  templateUrl: './initialise-firebase.component.html',
  styleUrls: ['./initialise-firebase.component.css'],
})
export class InitialiseFirebaseComponent {
  configText: string;
  @Input() name: string;

  constructor(private service: FirebaseService) {}

  handleConfig(): void {
    this.configText = cleanVariables(this.configText);
  }

  initFirebase(): void {
    this.service.init(this.configText);
  }
}
