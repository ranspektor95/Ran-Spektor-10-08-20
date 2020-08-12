import { Action } from '@ngrx/store';
import { ForecastModel } from '../../../../../libs/models/forecast.model';
import { WeatherItemModel } from '../../../../../libs/models/weather-item.model';

export enum ActionTypes {
  ADD_FAVORITE_LOCATION ='[AppState] Add Favorite Location',
  REMOVE_FAVORITE_LOCATION ='[AppState] Remove Favorite Location',
  GET_DATA_FOR_FAVORITE_LOCATION= '[AppState] Get Data For Favorite Location',
  GET_DATA_FOR_DEFAULT_LOCATION= '[AppState] Get Data For Default Location',
  SET_DATA_FOR_DEFAULT_LOCATION= '[AppState] Set Data For Default Location',
  SET_DATA_FOR_FAVORITE_LOCATION= '[AppState] Set Data For Favorite Location',
  SET_LAST_UPDATE_FAVORITE_DATA = '[AppState] Set Last Update Favorite Data',
  SET_LAST_UPDATE_DEFAULT_DATA = '[AppState] Set Last Update Default Data',
  CHANGE_METRIC_VALUE='[AppState] Change Metric Value',
}

export class AddFavoriteLocation implements Action {
   readonly type = ActionTypes.ADD_FAVORITE_LOCATION;

  constructor(public payload : { weatherItem : WeatherItemModel}) {
  }
}

export class RemoveFavoriteLocation implements Action {
  readonly type = ActionTypes.REMOVE_FAVORITE_LOCATION;

  constructor(public payload : { weatherItem : WeatherItemModel}) {
  }
}

export class GetDataForFavoriteLocation implements Action {
  readonly type = ActionTypes.GET_DATA_FOR_FAVORITE_LOCATION;

  constructor(public payload : { weatherItem : WeatherItemModel} ) {}
}

export class GetDataForDefaultLocation implements Action {
  readonly type = ActionTypes.GET_DATA_FOR_DEFAULT_LOCATION;

  constructor(public payload : { defaultWeatherItem : WeatherItemModel} ) {}
}

export class SetDataForDefaultLocation implements Action {
  readonly type = ActionTypes.SET_DATA_FOR_DEFAULT_LOCATION;

  constructor(public payload : { data : Array<ForecastModel>, weatherItem: WeatherItemModel } ) {}
}

export class SetDataForFavoriteLocation implements Action {
  readonly type = ActionTypes.SET_DATA_FOR_FAVORITE_LOCATION;

  constructor(public payload : { data : Array<ForecastModel>, weatherItem: WeatherItemModel } ) {}
}

export class SetLastUpdateFavoriteData implements Action {
  readonly type = ActionTypes.SET_LAST_UPDATE_FAVORITE_DATA;

  constructor() {}
}

export class SetLastUpdateDefaultData implements Action {
  readonly type = ActionTypes.SET_LAST_UPDATE_DEFAULT_DATA;

  constructor() {}
}

export class ChangeMetricValue implements Action {
  readonly type = ActionTypes.CHANGE_METRIC_VALUE;

  constructor(public payload : { currentMetricValue : boolean}) {}
}



export type AppActions = | ChangeMetricValue | RemoveFavoriteLocation | SetDataForDefaultLocation | GetDataForDefaultLocation | GetDataForFavoriteLocation | AddFavoriteLocation | SetDataForFavoriteLocation | SetLastUpdateDefaultData | SetLastUpdateFavoriteData
