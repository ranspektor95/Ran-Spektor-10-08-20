import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherItemModel } from '../../../../../libs/models/weather-item.model';
import { Subscription } from 'rxjs';
import { AppState } from '../store/app.state';
import { select, Store } from '@ngrx/store';
import * as fromSelectors from '../store/app.selectors';
import * as AppActions from '../store/app.actions';
import { Router } from '@angular/router';
import { AccuweatherService } from '../services/accuweather.service';

@Component({
  selector: 'weather-app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favorites: Array<WeatherItemModel>
  lastUpdate: Date;

  favoritesSub: Subscription;
  lastUpdateSub: Subscription;

  constructor(private store: Store<AppState>, private router: Router, private accuweatherService : AccuweatherService) {
  }

  ngOnInit(): void {
    this.subscribeStoreObservables();
  }

  ngOnDestroy(): void {
    this.unSubscribeStoreObservables();
  }

  subscribeStoreObservables() {
    this.favoritesSub = this.store.pipe(
      select(fromSelectors.selectFavorites)).subscribe(favorites => {
      this.favorites = favorites;
    });

    this.lastUpdateSub = this.store.pipe(
      select(fromSelectors.selectLastUpdatedFavoritesData)).subscribe(date => {
      this.lastUpdate = date;
    });
  }

  unSubscribeStoreObservables() {
    this.favoritesSub.unsubscribe();
    this.lastUpdateSub.unsubscribe();
  }


  async onUpdateClick() {
    if (this.favorites?.length > 0) {
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
  }

  onFavoriteClick(weatherItem: WeatherItemModel) {
    if (this.favorites?.find(fav => {
      if (fav.location?.Key === weatherItem?.location?.Key) return true
    })) {
      this.store.dispatch(new AppActions.RemoveFavoriteLocation({ weatherItem: weatherItem }));
    } else {
      this.store.dispatch(new AppActions.AddFavoriteLocation({ weatherItem: weatherItem }));
    }
  }

  onFullForecastClick(weatherItem: WeatherItemModel) {
    this.router.navigate([''], { state: { weatherItem: weatherItem } });
  }
}
