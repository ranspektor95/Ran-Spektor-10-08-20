import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import {  FormControl, Validators } from '@angular/forms';
import { AccuweatherService } from '../../services/accuweather.service';
import { WeatherItemModel } from '../../../../../../libs/models/weather-item.model';
import { LocationModel } from '../../../../../../libs/models/location.model';
import { Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromSelectors from '../../store/app.selectors';
import { AppState } from '../../store/app.state';
import { OverlaySpinner } from '../../core/overlay-spinner/overlay-spinner';

@Component({
  selector: 'weather-app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  weatherSearchControl : FormControl;
  @Output() eventSearchResult = new EventEmitter();

  favorites : Array<WeatherItemModel>
  favoritesSub : Subscription;
  isMetricSub : Subscription;

  constructor(private accuweatherService : AccuweatherService, private router : Router,private store: Store<AppState>, private overlaySpinner : OverlaySpinner) {}


  ngOnInit(): void {
    this.weatherSearchControl = new FormControl('');
    this.subscribeStoreObservables();

    //if moved from favorites url to home;
    if (history?.state?.weatherItem) {
      this.onWeatherItemSelect(history.state.weatherItem);
    }
  }


  ngOnDestroy(): void {
    this.unSubscribeStoreObservables();
  }

  subscribeStoreObservables(){
    this.favoritesSub = this.store.pipe(
      select(fromSelectors.selectFavorites)).subscribe( favorites => {
      this.favorites = favorites;
    });

    this.isMetricSub = this.store.pipe(
      select(fromSelectors.selectIsMetric)).subscribe( isMetric => {
      this.onSearchClick();
    });
  }

  unSubscribeStoreObservables(){
    this.favoritesSub.unsubscribe();
    this.isMetricSub.unsubscribe();
  }


  onSearchClick(){
    if(this.weatherSearchControl?.value?.length > 0) {
      this.overlaySpinner.showSpinner();
        this.accuweatherService.searchAutoComplete(this.weatherSearchControl.value).subscribe((res: Array<LocationModel>) => {
          if (res?.length > 0) {
            const searchResult = res[0];
            this.accuweatherService.getFiveDaysForecastByLocationKey(searchResult.Key).subscribe((forecast: { DailyForecasts: any }) => {
              this.overlaySpinner.hideSpinner();
              if (forecast?.DailyForecasts?.length > 0) {
                this.eventSearchResult.emit({
                  location: searchResult,
                  dailyForecasts: forecast.DailyForecasts
                } as WeatherItemModel)
              } else {
                this.router.navigate(['error']);
              }
            }, error => {
              this.overlaySpinner.hideSpinner();
              this.router.navigate(['error']);
              return throwError('Error');
            });
          } else {
            this.overlaySpinner.hideSpinner();
            this.eventSearchResult.emit(null);
          }
        }, error => {
            this.overlaySpinner.hideSpinner();
            this.router.navigate(['error']);
            return throwError('Error');
        })
      }
  }

  onWeatherItemSelect(weatherItem: WeatherItemModel) {
    this.weatherSearchControl.setValue(weatherItem.location.LocalizedName);
    this.eventSearchResult.emit(weatherItem);
  }


}
