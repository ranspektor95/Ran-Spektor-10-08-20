import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as fromSelectors from '../../store/app.selectors';
import { Subscription } from 'rxjs';
import * as AppActions from '../../store/app.actions';
import { WeatherItemModel } from '../../../../../../libs/models/weather-item.model';
import { OverlaySpinner } from '../overlay-spinner/overlay-spinner';
import { AccuweatherService } from '../../services/accuweather.service';
import { MatDialog } from '@angular/material/dialog';
import { AppPopUpComponent } from '../app-pop-up/app-pop-up.component';
import { CHANGE_METRICS } from '../../../../../../libs/models/app-pop-up-data.model';

@Component({
  selector: 'weather-app-base-template',
  templateUrl: './base-template.component.html',
  styleUrls: ['./base-template.component.scss'],
})
export class BaseTemplateComponent implements  OnInit, OnDestroy{
  copyright = '© Ran Spektor. 2020 copyright - Icons Created by Linseed Studio from Noun project ';
  navIcon= 'favorite';
  logo = 'assets/logo.svg';

  isMetric: boolean;
  favorites: Array<WeatherItemModel>
  defaultLocation : WeatherItemModel;

  isMetricSub: Subscription;
  defaultLocationSub : Subscription;
  favoritesSub: Subscription;

  constructor(private dialog : MatDialog, private router: Router, private store: Store<AppState>, private overlaySpinner : OverlaySpinner, private accuweatherService : AccuweatherService, ) {}

  ngOnInit(): void {
    this.subscribeStoreObservables();

    this.setPageIcon(this.router.url);

    this.router.events.subscribe( (url : NavigationEnd )=> {
      this.setPageIcon(url.url);
    });
  }

  ngOnDestroy(): void {
    this.unSubscribeStoreObservables();
  }

  subscribeStoreObservables() {
    this.isMetricSub = this.store.pipe(
      select(fromSelectors.selectIsMetric)).subscribe(isMetric => {
      this.isMetric = isMetric;
    });

    this.defaultLocationSub = this.store.pipe(
      select(fromSelectors.selectDefaultLocation)).subscribe( data => {
      this.defaultLocation = data;
    });

    this.favoritesSub = this.store.pipe(
      select(fromSelectors.selectFavorites)).subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  unSubscribeStoreObservables() {
    this.isMetricSub.unsubscribe();
  }


  setPageIcon(url : string){
    switch(url) {
      case pageUrlOptions.favorite:
        this.navIcon = 'home'
        break;
      case pageUrlOptions.home:
        this.navIcon = 'favorite'
        break;
      default:
        this.navIcon = 'favorite'
    }
  }

  navigateToFavorite(){
    this.router.navigate(['/favorites']);
  }

  navigateToHome(){
    this.router.navigate(['/home']);
  }

  async changeUnit(){
    this.overlaySpinner.showSpinner();
    this.store.dispatch( new AppActions.ChangeMetricValue({currentMetricValue : this.isMetric}));

    for await (const favorite of this.favorites) {
      this.accuweatherService.getFiveDaysForecastByLocationKey(favorite.location.Key).subscribe( async res => {
        this.store.dispatch(new AppActions.SetDataForFavoriteLocation({data :res.DailyForecasts ,  weatherItem: favorite }));
      })
    }

    if(this.defaultLocation) {
      this.store.dispatch( new AppActions.GetDataForDefaultLocation({defaultWeatherItem : this.defaultLocation }));
      this.store.dispatch(new AppActions.SetLastUpdateDefaultData());
    }
    this.overlaySpinner.hideSpinner();
  }

  onChangeUnitClick(){
    const dialogRef = this.dialog.open(AppPopUpComponent, {
      autoFocus: true,
      restoreFocus: false,
      hasBackdrop: true,
      backdropClass: 'dialog-open',
      width: '500px',
      data: {
        popUpData: CHANGE_METRICS,
        content: this.isMetric ? 'Imperial' : 'Metrics'
      }
    });

    dialogRef.afterClosed().subscribe(async res => {
      if (res) {
        this.changeUnit();
      }
    });
  }

}

export enum pageUrlOptions {
  favorite = '/favorites',
  home= '/home'
}
