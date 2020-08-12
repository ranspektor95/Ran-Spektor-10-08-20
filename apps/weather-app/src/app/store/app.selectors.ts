import { AppState } from './app.state';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { WeatherItemModel } from '../../../../../libs/models/weather-item.model';


const getFavorites = (state : AppState): Array<WeatherItemModel> => state.favoritesLocations;
const getDefaultLocation = (state : AppState): WeatherItemModel => state.defaultLocation;
const getLastUpdatedFavorites = (state : AppState): Date => state.lastUpdateFavoriteData;
const getLastUpdatedDefault = (state : AppState): Date => state.lastUpdateDefaultData
const getIsMetric = (state : AppState): boolean => state.isMetric;



export const selectAppFeatureState: MemoizedSelector<object,AppState> = createFeatureSelector<AppState>('state');

export const selectFavorites: MemoizedSelector<object,Array<WeatherItemModel>> = createSelector(selectAppFeatureState,getFavorites);

export const selectDefaultLocation: MemoizedSelector<object,WeatherItemModel> = createSelector(selectAppFeatureState,getDefaultLocation);

export const selectLastUpdatedDefaultData: MemoizedSelector<object,Date> = createSelector(selectAppFeatureState,getLastUpdatedDefault);

export const selectLastUpdatedFavoritesData: MemoizedSelector<object,Date> = createSelector(selectAppFeatureState,getLastUpdatedFavorites);

export const selectIsMetric: MemoizedSelector<object,boolean> = createSelector(selectAppFeatureState,getIsMetric);
