import { initialState } from './app.state';
import { ActionTypes, AppActions } from './app.actions';
import * as AppHelpers from './app.helpers';
import { WeatherItemModel } from '../../../../../libs/models/weather-item.model';

export function appReducer(state= initialState, action: AppActions){
  switch (action.type){
    case ActionTypes.ADD_FAVORITE_LOCATION: {
      return {
        ...state,
        favoritesLocations: [...state.favoritesLocations, action.payload.weatherItem]
      }
    }
    case ActionTypes.GET_DATA_FOR_FAVORITE_LOCATION: {
      return {
        ...state
      }
    }
    case ActionTypes.SET_DATA_FOR_FAVORITE_LOCATION: {
      const new_favorites = AppHelpers.addForecastToFavorite([...state.favoritesLocations], action.payload.weatherItem, action.payload.data )
      return {
        ...state,
        favoritesLocations: new_favorites
      }
    }
    case ActionTypes.REMOVE_FAVORITE_LOCATION: {
      const new_favorites = AppHelpers.RemoveFavorite([...state.favoritesLocations], action.payload.weatherItem)
      return {
        ...state,
        favoritesLocations: new_favorites
      }
    }
    case ActionTypes.SET_LAST_UPDATE_DEFAULT_DATA:{
      return {
        ...state,
        lastUpdateDefaultData : new Date()
      }
    }
    case ActionTypes.SET_LAST_UPDATE_FAVORITE_DATA:{
      return {
        ...state,
        lastUpdateFavoriteData : new Date()
      }
    }
    case ActionTypes.GET_DATA_FOR_DEFAULT_LOCATION:{
      return {
        ...state,
      }
    }
    case ActionTypes.SET_DATA_FOR_DEFAULT_LOCATION:{
      const new_default = {location : action.payload.weatherItem.location, dailyForecasts : action.payload.data} as WeatherItemModel;
      return {
        ...state,
        defaultLocation : new_default
      }
    }
    case ActionTypes.CHANGE_METRIC_VALUE:{
      return {
        ...state,
        isMetric : !action.payload.currentMetricValue
      }
    }
    default: { return state};

  }

}
