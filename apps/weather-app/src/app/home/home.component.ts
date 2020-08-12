import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherItemModel } from '../../../../../libs/models/weather-item.model';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import * as fromSelectors from '../store/app.selectors';
import * as AppActions from '../store/app.actions';

@Component({
  selector: 'weather-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  defaultLocation : WeatherItemModel;
  lastUpdateDefaultLocation : Date;
  searchedLocation : WeatherItemModel;
  isNoResult = false;

  defaultLocationSub : Subscription;
  lastUpdateDefaultLocationSub : Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscribeStoreObservables();

  }

  ngOnDestroy(): void {
    this.unSubscribeStoreObservables();
  }

  subscribeStoreObservables(){
    this.defaultLocationSub = this.store.pipe(
      select(fromSelectors.selectDefaultLocation)).subscribe( data => {
      this.defaultLocation = data;
    });

    this.lastUpdateDefaultLocationSub = this.store.pipe(
      select(fromSelectors.selectLastUpdatedDefaultData)).subscribe( date => {
      this.lastUpdateDefaultLocation = date;
    });
  }

  unSubscribeStoreObservables(){
    this.defaultLocationSub.unsubscribe();
    this.lastUpdateDefaultLocationSub.unsubscribe();
  }

  onSearchResultEvent( weatherItem: WeatherItemModel){
    this.searchedLocation= weatherItem;
    this.isNoResult = !weatherItem;
  }


  onUpdateDefaultClick() {
    if(this.defaultLocation) {
      this.store.dispatch( new AppActions.GetDataForDefaultLocation({defaultWeatherItem : this.defaultLocation }));
      this.store.dispatch(new AppActions.SetLastUpdateDefaultData());
    }
  }
}
