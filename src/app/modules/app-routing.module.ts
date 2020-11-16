import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataCopyComponent } from '../components/data-copy/data-copy.component';
import { DownloadComponent } from '../components/download/download.component';
import { UploadComponent } from '../components/upload/upload.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'download' },
  { path: 'download', pathMatch: 'full', component: DownloadComponent },
  { path: 'upload', pathMatch: 'full', component: UploadComponent },
  { path: 'copy', pathMatch: 'full', component: DataCopyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
