import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FirebaseService} from './firebase.service';
import {jsonFromFile} from './helper';
import {CollectionData} from './models/collection-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  configText: string;
  data: CollectionData[];

  constructor(private snack: MatSnackBar, private service: FirebaseService) {
  }

  initFirebase(): void {
    this.service.init(this.configText);
  }

  async handleData(event: any): Promise<void> {
    const jsonData = await jsonFromFile(event.target.files[0] as File);

    this.data = CollectionData.fromJSON(jsonData);
  }

  upload(): void {
    this.service.upload(this.data);
  }

  cleanText(text: string): string {
    return text
      .split('\n')
      .map(line => line
        .replace('" ', '')
        .replace('",', '')
        .replace('"', '')
        .trim()
      ).join('\n');
  }

  handleConfig(): void {
    console.log("Config");
    this.configText = this.cleanText(this.configText);
  }
}

