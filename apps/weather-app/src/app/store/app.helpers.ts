import { WeatherItemModel } from '../../../../../libs/models/weather-item.model';
import { ForecastModel } from '../../../../../libs/models/forecast.model';

export function addForecastToFavorite(favorites : Array<WeatherItemModel>, weatherItem: WeatherItemModel, data: Array<ForecastModel> ): Array<WeatherItemModel>{
  const index = favorites.indexOf(weatherItem);
  if (index !== -1) {
    favorites[index] = { location: favorites[index].location, dailyForecasts: data } as WeatherItemModel;
  }

  return favorites;
}

export function RemoveFavorite(favorites : Array<WeatherItemModel>, weatherItem: WeatherItemModel ): Array<WeatherItemModel>{

  return favorites.filter(fav => fav.location.Key !== weatherItem.location.Key)
}


