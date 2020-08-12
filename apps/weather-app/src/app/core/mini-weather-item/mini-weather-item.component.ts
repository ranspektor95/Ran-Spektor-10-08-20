import { Component, Input } from '@angular/core';
import { ForecastModel } from '../../../../../../libs/models/forecast.model';

@Component({
  selector: 'weather-app-mini-weather-item',
  templateUrl: './mini-weather-item.component.html',
  styleUrls: ['./mini-weather-item.component.scss'],
})
export class MiniWeatherItemComponent  {
  @Input() forecast: ForecastModel;


  getWeatherIcon(iconNumber: number) {
    if (iconNumber < 3) return 'sun'
    else if (iconNumber < 6) return 'partly_sunny'
    else if (iconNumber < 12) return 'cloud'
    else if (iconNumber < 15) return 'showers'
    else if (iconNumber < 22) return 'rain'
    else if (iconNumber < 30) return 'snow'
    else if (iconNumber < 31) return 'sun'
    else if (iconNumber < 32) return 'moon'
    else if (iconNumber < 33) return 'cloud'
    else if (iconNumber < 34) return 'moon'
    else return 'cloud_moon'
  }

}
