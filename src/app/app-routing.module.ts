import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataCopyComponent } from './components/data-copy/data-copy.component';
import { FileImportComponent } from './components/file-import/file-import.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: FileImportComponent },
  { path: 'upload', pathMatch: 'full', component: FileImportComponent },
  { path: 'copy', pathMatch: 'full', component: DataCopyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
