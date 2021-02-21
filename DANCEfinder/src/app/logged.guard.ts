import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { GlobalService } from './services/global.service';

@Injectable({
  providedIn: 'root'
})

export class LoggedGuard implements CanActivate {
  public account: any;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private service: GlobalService,
    private router: Router
  ) {
    this.service.account.pipe(takeUntil(this.destroyed$)).subscribe((account: any) => this.account = account);
  }

  public canActivate(): UrlTree | boolean {

    this.service.accessToken = localStorage.getItem('token') || '';

    if (this.service.useWithoutLogin) {
      return true;
    }

    if (this.service.accessToken) {
      return true;
    }
  }
}
