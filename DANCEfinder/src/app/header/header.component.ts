import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, ReplaySubject } from 'rxjs';
import { map, takeUntil, take, catchError, switchMap } from 'rxjs/operators';

import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public account: any;
  public isMenu = false;
  public searchTerm: string;
  public searchTermMobile: string;
  public isSearchMobile = false;

  public get useWithoutLogin(): boolean {
    return this.service.useWithoutLogin;
  }

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    public router: Router,
    public service: GlobalService,
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {

    this.service.searchTermChange.subscribe((value) => {
      this.searchTerm = value
      this.searchTermMobile = value
    })

    if (localStorage.getItem('token')) {
      const userEmail = localStorage.getItem('userEmail');

      this.httpService.postPersonGetByEmail(userEmail).pipe(
        catchError(() => of({})),
        take(1),
        takeUntil(this.destroyed$),
        map((person) => {
          return person
        }),
      )
        .subscribe((account: any) => {
          this.service.useWithoutLogin = false;
          this.account = account
          this.service.account.next(account)
        });
    }
  }

  public resetSearchTerm() {
    this.searchTerm = '';
    this.searchTermMobile = '';
    this.service.searchTermChange.next('');
  }

  public get ownerPrivileges(): boolean {
    return this.service.ownerPrivileges;
  }

  public get allPrivileges(): boolean {
    return this.service.allPrivileges;
  }

  public onSearch(): void {
    this.service.searchTermChange.next(this.searchTerm);
  }

  public onSearchMobile(): void {
    this.service.searchTermChange.next(this.searchTermMobile);
  }

  public logout(): void {
    this.account = null;
    this.isMenu = false;
    localStorage.clear();
    this.service.account.next(null);
    this.router.navigate(['/'])
  }

  public showMenu(): void {
    this.isMenu = !this.isMenu;
  }

  public changeSearchStatus(): void {
    this.isSearchMobile = !this.isSearchMobile;
  }

  public redirectToInitialPage(page: string): void {
    if (page === 'login') {
      this.router.navigate(['login']);
    } else if (page === 'registration') {
      this.router.navigate(['registration']);
    }
    this.service.useWithoutLogin = false;
  }
}
