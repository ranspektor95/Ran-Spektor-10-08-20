import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  logo = 'assets/deer-icon.svg';
  constructor(private router: Router) {}
  ngOnInit(): void {}

  onRetryClick() {
    this.router.navigate(['']);
  }
}
