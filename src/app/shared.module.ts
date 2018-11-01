import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

const MODULES = [
  CommonModule,
  HttpClientModule,
  MatCardModule,
  MatListModule,
  MatIconModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatButtonModule
]

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class SharedModule { }
