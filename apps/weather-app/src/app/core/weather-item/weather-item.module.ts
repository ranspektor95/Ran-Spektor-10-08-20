import { NgModule } from '@angular/core';
import { WeatherItemComponent } from './weather-item.component';
import { CommonModule } from '@angular/common';
import { MiniWeatherItemModule } from '../mini-weather-item/mini-weather-item.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [WeatherItemComponent],
  imports: [
    CommonModule,
    MiniWeatherItemModule,
    MatIconModule
  ],
  bootstrap: [WeatherItemComponent],
  exports: [
    WeatherItemComponent
  ]
})
export class WeatherItemModule {}
