import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { GlobalService } from '../services/global.service';

@Injectable({
  providedIn: 'root'
})
export class PrivilegesGuard implements CanActivate {
  constructor(
    private service: GlobalService,
    private router: Router
  ) { }

  public canActivate(): boolean | UrlTree {
    if ((this.service.ownerPrivileges || this.service.allPrivileges) && !this.service.useWithoutLogin) {
      return true;
    } else {
      return this.router.parseUrl('/main');
    }
  }
}
