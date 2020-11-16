import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDataComponent } from './components/add-data/add-data.component';
import { DataCopyComponent } from './components/data-copy/data-copy.component';
import { DownloadComponent } from './components/download/download.component';
import { FileImportComponent } from './components/file-import/file-import.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'download' },
  { path: 'download', pathMatch: 'full', component: DownloadComponent },
  { path: 'upload', pathMatch: 'full', component: FileImportComponent },
  { path: 'copy', pathMatch: 'full', component: DataCopyComponent },
  { path: 'add', pathMatch: 'full', component: AddDataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
