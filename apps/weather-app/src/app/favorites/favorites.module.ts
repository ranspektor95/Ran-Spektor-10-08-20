import { NgModule } from '@angular/core';
import { FavoritesComponent } from './favorites.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    MatCardModule,
    CommonModule,
    CoreModule,
    MatIconModule,
    MatTooltipModule
  ],
  bootstrap: [FavoritesComponent],
})
export class FavoritesModule {}
