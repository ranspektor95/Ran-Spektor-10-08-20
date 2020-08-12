import { NgModule } from '@angular/core';
import { BaseTemplateModule } from './base-template/base-template.module';
import { WeatherItemModule } from './weather-item/weather-item.module';
import { MiniWeatherItemModule } from './mini-weather-item/mini-weather-item.module';
import { AppPopUpModule } from './app-pop-up/app-pop-up.module';

@NgModule({
  exports: [AppPopUpModule,BaseTemplateModule,WeatherItemModule,MiniWeatherItemModule],
  imports: [AppPopUpModule,BaseTemplateModule,WeatherItemModule,MiniWeatherItemModule]
})
export class CoreModule {}
