import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { DataCopyComponent } from './components/data-copy/data-copy.component';
import { DocumentSelectorComponent } from './components/document-selector/document-selector.component';
import { DownloadComponent } from './components/download/download.component';
import { UploadComponent } from './components/upload/upload.component';
import { InitialiseFirebaseComponent } from './components/initialise-firebase/initialise-firebase.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    DataCopyComponent,
    InitialiseFirebaseComponent,
    DownloadComponent,
    DocumentSelectorComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MaterialFileInputModule,
    MatIconModule,
    FormsModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
