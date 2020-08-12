import { WeatherItemModel } from '../../../../../libs/models/weather-item.model';

export interface AppState {
    defaultLocation : WeatherItemModel;
    favoritesLocations : Array<WeatherItemModel>;
    lastUpdateFavoriteData: Date;
    lastUpdateDefaultData: Date;
    isMetric : boolean;
  }

export const initialState: AppState = {
  defaultLocation : { location: {
    Key: '215854',
      LocalizedName: 'Tel Aviv',
      Country: {
      LocalizedName: 'Israel',
    }
  }, dailyForecasts: null}
  ,favoritesLocations : [ { location:{
    Key: '215854',
    LocalizedName: 'Tel Aviv',
    Country: {
      LocalizedName: 'Israel',
    }
  }, dailyForecasts: null},
    { location:{
        Key: '328328',
        LocalizedName: 'London',
        Country: {
          LocalizedName: 'United Kingdom',
        }
      }, dailyForecasts: null},
    { location:{
        Key: '623',
        LocalizedName: 'Paris',
        Country: {
          LocalizedName: 'France',
        }
      }, dailyForecasts: null}],
  lastUpdateFavoriteData: null,
  lastUpdateDefaultData: null,
  isMetric: true
}
