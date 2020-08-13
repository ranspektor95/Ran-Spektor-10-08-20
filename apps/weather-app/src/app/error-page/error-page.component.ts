import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ACCU_WEATHER_KEY } from '../../../../../libs/models/url.consts';

@Component({
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  logo = 'assets/deer-icon.svg';
  keyControl : FormControl;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.keyControl = new FormControl('');
  }

  onRetryClick() {
    if(this.keyControl?.value?.length > 0){
      ACCU_WEATHER_KEY.key = this.keyControl.value;
    }
    this.router.navigate(['']);
  }

}
