import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ErrorPageComponent } from './error-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [BrowserModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  bootstrap: [ErrorPageComponent]
})
export class ErrorPageModule {}
