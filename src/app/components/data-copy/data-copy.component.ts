import { Component, OnInit } from '@angular/core';
import {CollectionData} from '../../models/collection-data';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FirebaseService} from '../../services/firebase.service';
import {jsonFromFile} from '../../helpers/helper';

@Component({
  selector: 'app-data-copy',
  templateUrl: './data-copy.component.html',
  styleUrls: ['./data-copy.component.css']
})
export class DataCopyComponent {
  configText: string;
  jsonData: any;
  fileData: CollectionData[];

  constructor(private snack: MatSnackBar, private service: FirebaseService) {}

  initFirebase(): void {
    this.service.init(this.configText);
  }

  async handleData(event: any): Promise<void> {
    this.jsonData = await jsonFromFile(event.target.files[0] as File);

    this.fileData = CollectionData.fromJSON(this.jsonData);
  }

  upload(): void {
    this.service.upload(this.fileData);
  }

  cleanText(text: string): string {
    return text
      .split('\n')
      .map(line => line.replace('" ', '').replace('",', '').replace('"', '').trim())
      .join('\n');
  }

  handleConfig(): void {
    this.configText = this.cleanText(this.configText);
  }
}
