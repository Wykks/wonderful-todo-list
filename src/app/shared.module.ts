import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

const MODULES = [
  CommonModule,
  ReactiveFormsModule,
  HttpClientModule,
  MatCardModule,
  MatListModule,
  MatIconModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatTooltipModule
]

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class SharedModule { }
