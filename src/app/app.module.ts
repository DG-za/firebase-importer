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
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './components/app/app.component';
import { CopyComponent } from './components/copy/copy.component';
import { DocumentSelectorComponent } from './components/document-selector/document-selector.component';
import { DownloadComponent } from './components/download/download.component';
import { InitialiseFirebaseComponent } from './components/initialise-firebase/initialise-firebase.component';
import { LoginComponent } from './components/login-dialog/login.component';
import { UploadComponent } from './components/upload/upload.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { FontAwesomeModule } from "./modules/font-awesome.module";

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    CopyComponent,
    InitialiseFirebaseComponent,
    DownloadComponent,
    DocumentSelectorComponent,
    LoginComponent,
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
    MatProgressSpinnerModule,
    MatDialogModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
