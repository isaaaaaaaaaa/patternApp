import { AngularMaterialModule } from './_modules/angular-material.module';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent, FileUploadComponent],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [NavbarComponent, FileUploadComponent]
})
export class SharedModule { }
