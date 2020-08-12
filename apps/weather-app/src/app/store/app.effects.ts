import { Injectable } from '@angular/core';
import { ActionTypes } from './app.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as AppActions from './app.actions'
import { of, throwError } from 'rxjs';
import { AccuweatherService } from '../services/accuweather.service';
import { Router } from '@angular/router';


@Injectable()
export class AppEffects {
  constructor(private accuweatherService : AccuweatherService,  private actions$ : Actions, private router: Router){}


  @Effect()
  GetDataForFavorite = this.actions$.pipe(
    ofType(ActionTypes.GET_DATA_FOR_FAVORITE_LOCATION),
    switchMap((action : AppActions.GetDataForFavoriteLocation) => {
      return this.accuweatherService.getFiveDaysForecastByLocationKey(action.payload.weatherItem.location.Key).pipe(switchMap((res : any) => {
          if(res){
            return of({weatherItem:action.payload.weatherItem, res:res});
          }else{
            this.router.navigate(['error']);
            return throwError('Error AccuWeather');
          }
      }))
    })
    ,map(res => {
      return new AppActions.SetDataForFavoriteLocation({data: res.res.DailyForecasts , weatherItem: res.weatherItem})
    })
    ,catchError(err=> {
      this.router.navigate(['error']);
      return throwError('Error ' + ActionTypes.GET_DATA_FOR_FAVORITE_LOCATION);
    })
  )

  @Effect()
  GetDataForDefault = this.actions$.pipe(
    ofType(ActionTypes.GET_DATA_FOR_DEFAULT_LOCATION),
    switchMap((action : AppActions.GetDataForDefaultLocation) => {
      return this.accuweatherService.getFiveDaysForecastByLocationKey(action.payload.defaultWeatherItem.location.Key).pipe(switchMap((res : any) => {
        if(res){
          return of({weatherItem:action.payload.defaultWeatherItem, res:res});
        }else{
          this.router.navigate(['error']);
          return throwError('Error AccuWeather');
        }
      }))
    })
    ,map(res => {
      return new AppActions.SetDataForDefaultLocation({data: res.res.DailyForecasts , weatherItem: res.weatherItem})
    })
    ,catchError(err=> {
      this.router.navigate(['error']);
      return throwError('Error ' + ActionTypes.GET_DATA_FOR_FAVORITE_LOCATION);
    })
  )


}
