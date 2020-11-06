import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { jsonFromFile } from '../../helpers/helper';
import { CollectionData } from '../../models/collection-data';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-file-import',
  templateUrl: './file-import.component.html',
  styleUrls: ['./file-import.component.css'],
})
export class FileImportComponent {
  configText: string;
  data: CollectionData[];

  constructor(private snack: MatSnackBar, private service: FirebaseService) {}

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
      .map(line => line.replace('" ', '').replace('",', '').replace('"', '').trim())
      .join('\n');
  }

  handleConfig(): void {
    console.log('Config');
    this.configText = this.cleanText(this.configText);
  }
}
