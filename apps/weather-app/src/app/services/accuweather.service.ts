import { Injectable } from '@angular/core';
import {
  ACCU_WEATHER_KEY,
  AUTO_COMPLETE_SEARCH_URL,
  FIVE_DAYS_FORECAST_BY_LOCATION_KEY_URL
} from '../../../../../libs/models/url.consts';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import * as fromSelectors from '../store/app.selectors';

@Injectable({
  providedIn: 'root'
})
export class AccuweatherService {
  isMetric: boolean;
  isMetricSub: Subscription;

  constructor(private httpClient : HttpClient, private store: Store<AppState>) {
    this.isMetricSub = this.store.pipe(
      select(fromSelectors.selectIsMetric)).subscribe(isMetric => {
      this.isMetric = isMetric;
    });
  }

  getFiveDaysForecastByLocationKey(locationKey : string) : Observable<any>{
      return this.httpClient.get<any>(
        FIVE_DAYS_FORECAST_BY_LOCATION_KEY_URL + '/' + locationKey, { params: new HttpParams().append('apikey', ACCU_WEATHER_KEY).append('metric', this.isMetric ? 'true' : 'false') }
      )
  }

  searchAutoComplete(searchValue : string) : Observable<any> {
    return this.httpClient.get<any>(
      AUTO_COMPLETE_SEARCH_URL, { params: new HttpParams().append('apikey', ACCU_WEATHER_KEY).append('q', searchValue) }
    )
  }


}
