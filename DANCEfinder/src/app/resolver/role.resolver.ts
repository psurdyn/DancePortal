import { GlobalService } from 'src/app/services/global.service';
import { HttpService } from 'src/app/services/http.service';
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RoleResolver implements Resolve<string> {
  constructor(
    private httpService: HttpService,
    private globalService: GlobalService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {
    if (localStorage.getItem('token')) {
      this.globalService.updateUserDetails();
    }
    return false;
  }
}
