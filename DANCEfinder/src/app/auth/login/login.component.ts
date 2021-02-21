import { switchMap, take, catchError } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../services/global.service';
import { HttpService } from './../../services/http.service';
import { from, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public email: string = '';
  public password: string = '';
  public errorLoginOrEmail = 'Błędny login lub hasło'
  public isLoading: boolean = false;
  public isLoginError: boolean = false;
  public isLogged: boolean = false;


  constructor(
    public service: GlobalService,
    private router: Router,
    private httpService: HttpService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['main'])
    }
  }

  public dbLogin(): void {
    const logIn = this.httpService.login(this.email, this.password);
    const getUserId = this.service.getPersonId(this.email);
    this.isLoginError = false;

    logIn.pipe(
      switchMap((loginData: any) => {
        localStorage.setItem('token', loginData.access_token)
        this.service.accessToken = loginData.access_token;
        return of(loginData.access_token);
      }),
      take(1),
      switchMap((token) => {
        return this.httpService.postPersonGetByEmailAndToken(this.email, token).pipe(take(1))
      }),
      switchMap((user: any) => {
        this.service.userData = user;
        this.service.account.next(user)

        localStorage.setItem('userEmail', this.email);
        return of(localStorage.setItem('userId', user.Id));
      }),
      switchMap(() => {
        this.service.useWithoutLogin = false;
        this.httpService.updateHeaders();
        return this.service.checkRole();
      }),
      switchMap(() => {
        return from(this.router.navigate(['/main']));
      }),
      catchError((err: any) => {
        this.isLoginError = true
        return of(localStorage.clear())
      })).subscribe();
  }

  public useWithoutLogin(): void {
    this.service.useWithoutLogin = true;
    this.router.navigate(['/main']);
  }
}
