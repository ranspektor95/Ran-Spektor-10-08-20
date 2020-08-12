import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Actions } from '@ngrx/effects';
import { Observable, Subscription } from 'rxjs';
import * as fromSelectors from '../store/app.selectors';
import * as AppActions from '../store/app.actions';
import { WeatherItemModel } from '../../../../../libs/models/weather-item.model';
import { AccuweatherService } from './accuweather.service';

@Injectable({providedIn: 'root'})
export class AppResolverService implements Resolve<any> {
  favorites : Array<WeatherItemModel>;
  defaultLocation : WeatherItemModel;
  constructor(private accuweatherService: AccuweatherService, private store: Store<AppState>, private actions$ : Actions) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Observable<any> | Promise<any> | any> {

    this.store.select(fromSelectors.selectFavorites).subscribe( favorites=> {
      this.favorites = favorites;
    });

    this.store.select(fromSelectors.selectDefaultLocation).subscribe( defaultLocation => {
      this.defaultLocation = defaultLocation;
    });

    if(this.favorites?.length > 0) {
      for await (const favorite of this.favorites) {
        this.accuweatherService.getFiveDaysForecastByLocationKey(favorite.location.Key).subscribe(async res => {
          this.store.dispatch(new AppActions.SetDataForFavoriteLocation({
            data: res.DailyForecasts,
            weatherItem: favorite
          }));
        })
      }
      this.store.dispatch(new AppActions.SetLastUpdateFavoriteData());
    }

    if(this.defaultLocation) {
      this.store.dispatch( new AppActions.GetDataForDefaultLocation({defaultWeatherItem : this.defaultLocation }));
      this.store.dispatch(new AppActions.SetLastUpdateDefaultData());
    }
  }
}
