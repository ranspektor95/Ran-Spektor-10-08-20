import { ForecastModel } from './forecast.model';
import { LocationModel } from './location.model';

export interface WeatherItemModel{
  location : LocationModel,
  dailyForecasts : Array<ForecastModel>
}
