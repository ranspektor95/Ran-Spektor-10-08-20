import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WeatherItemModel } from '../../../../../../libs/models/weather-item.model';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromSelectors from '../../store/app.selectors';
import { AppState } from '../../store/app.state';
import * as AppActions from '../../store/app.actions';

@Component({
  selector: 'weather-app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.scss'],
})
export class WeatherItemComponent implements  OnInit, OnDestroy {
  @Input() weatherItem : WeatherItemModel;
  favorites : Array<WeatherItemModel>
  favoritesSub : Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscribeStoreObservables();
  }

  ngOnDestroy(): void {
    this.unSubscribeStoreObservables();
  }

  subscribeStoreObservables(){
    this.favoritesSub = this.store.pipe(
      select(fromSelectors.selectFavorites)).subscribe( favorites => {
      this.favorites = favorites;
    });
  }

  unSubscribeStoreObservables(){
    this.favoritesSub.unsubscribe();
  }


  getFavoriteIcon() : string{
    return (this.favorites?.find( fav => { if(fav.location?.Key === this.weatherItem?.location?.Key) return true})) ? 'favorite' : 'favorite_border'
  }

  onFavoriteClick(){
    if(this.favorites?.find( fav => { if(fav.location?.Key === this.weatherItem?.location?.Key) return true})){
      this.store.dispatch( new AppActions.RemoveFavoriteLocation({ weatherItem: this.weatherItem }));
    }else{
      this.store.dispatch( new AppActions.AddFavoriteLocation({ weatherItem: this.weatherItem }));
    }
  }
}
