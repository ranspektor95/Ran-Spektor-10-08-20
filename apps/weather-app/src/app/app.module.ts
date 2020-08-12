
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from './core/core.module';
import { BaseTemplateComponent } from './core/base-template/base-template.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FavoritesModule } from './favorites/favorites.module';
import { FavoritesComponent } from './favorites/favorites.component';
import { appReducer } from './store/app.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/app.effects';
import { HttpClientModule } from '@angular/common/http';
import { AppResolverService } from './services/app-resolver.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ErrorPageModule } from './error-page/error-page.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule,
    StoreModule.forRoot( [appReducer]),
    StoreModule.forFeature('state', appReducer),
    EffectsModule.forFeature([AppEffects]) ,
    EffectsModule.forRoot([AppEffects]),
    BrowserAnimationsModule,CoreModule,FavoritesModule, BrowserModule, HomeModule, RouterModule.forRoot(
    [{ path: '', pathMatch: 'full', redirectTo: '/home' }, {
      path: '',
      component: BaseTemplateComponent,
      resolve: [AppResolverService],
      children: [
        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'favorites',
          component: FavoritesComponent
        },
        ]

    }, {path: '**', component: ErrorPageComponent}]), MatButtonModule,ErrorPageModule, MatDialogModule],
  bootstrap: [AppComponent],
  providers : [{ provide: MAT_DATE_LOCALE, useValue: "en-AU" }]

})
export class AppModule {}


