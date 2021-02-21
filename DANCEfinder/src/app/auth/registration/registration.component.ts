import { map, switchMap, catchError, take, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Group } from 'src/app/models/Group';
import { IRegistrationErrorTextMessages } from 'src/app/models/IErrorTextMessages';
import { HttpService } from 'src/app/services/http.service';

import { GlobalService } from './../../services/global.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public errorTextMessages: IRegistrationErrorTextMessages = {
    name: "Niepoprawne imię, imię może zawierać tylko litery",
    surname: "Niepoprawne nazwisko, nazwisko może zawierać tylko litery",
    email: "Niepoprawny e-mail",
    password: "Niepoprawne hasło, hasło musi zawierać minimum 6 znaków w tym przynajmniej 1 wielką literę, 1 znak specjalny oraz jedna cyfrę",
    phone: "Niepoprawny numer telefonu, telefon musi zawierać 9 cyfr",
    sex: "Nie wybrano płci",
    group: "Nie wybrano grupy"
  };
  public registrationForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required,
    Validators.maxLength(50),
    Validators.pattern('^[a-zA-Z ąĄćĆęĘłŁśŚóÓńŃżŻźŹ]*$')]),
    surname: new FormControl('', [Validators.required,
    Validators.maxLength(50),
    Validators.pattern('^[a-zA-Z ąĄćĆęĘłŁśŚóÓńŃżŻźŹ]*$')]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}'), Validators.required]),
    phone: new FormControl('', [Validators.pattern(/\d/), Validators.maxLength(9), Validators.minLength(9), Validators.required]),
    sex: new FormControl('', [Validators.required]),
    group: new FormControl('', [Validators.required]),
  });
  public group: typeof Group = Group;
  public isStudentChecked: boolean = false;
  public isInstructorChecked: boolean = false;
  public isOwnerChecked: boolean = false;

  constructor(
    private router: Router,
    private service: GlobalService,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['main'])
    }
  }

  public dbRegisterUser(): void {
    this.httpService.register(
      {
        Email: this.registrationForm.get("email").value,
        Password: this.registrationForm.get("password").value,
        ConfirmPassword: this.registrationForm.get("password").value
      }
    ).pipe(
      switchMap((id: any) => {
        return this.httpService.putPersonAdd({
          AspNetUserId: id,
          Email: this.registrationForm.get('email').value,
          FirstName: this.registrationForm.get('name').value,
          LastName: this.registrationForm.get('surname').value,
          Sex: this.registrationForm.get('sex').value,
          TelephoneNumber: this.registrationForm.get('phone').value,
        })
      }),
      switchMap((id) => {
        return this.httpService.login(
          this.registrationForm.get("email").value,
          this.registrationForm.get("password").value)
          .pipe(
            switchMap((loginData: any) => {
              localStorage.setItem('token', loginData.access_token)
              this.service.accessToken = loginData.access_token;
              return of(id);
            }),
            take(1),
            tap(() => this.httpService.updateHeaders())
          )
      }),
      switchMap((id: any) => {
        switch (true) {
          case this.isInstructorChecked:
            return this.httpService.putInstructorAdd({ PersonId: id });
          case this.isOwnerChecked:
            return this.httpService.putOwnerAdd({ PersonId: id });
          default:
            return this.httpService.putClientAdd({ PersonId: id });
        }
      })
    ).subscribe(
      () => { this.showSuccessSnackbar() },
      () => {
        localStorage.clear();
        this.service.showFailureSnackbar('Nie udało się zarejetrować')
      },
    );
  }

  public showSuccessSnackbar(): void {
    localStorage.clear();
    const successMessage: string = "Pomyślnie zarejestrowano!";
    this.service.showSuccessSnackbar(successMessage);
    this.router.navigate(['/login']);
  }

  public setUserGroup(isChecked: boolean, group: string): void {
    switch (isChecked) {
      case group === this.group.STUDENT:
        this.isInstructorChecked = false;
        this.isOwnerChecked = false;
        return this.registrationForm.controls["group"].setValue(group);
      case group === this.group.INSTRUCTOR:
        this.isStudentChecked = false;
        this.isOwnerChecked = false;
        return this.registrationForm.controls["group"].setValue(group);
      case group === this.group.OWNER:
        this.isStudentChecked = false;
        this.isInstructorChecked = false;
        return this.registrationForm.controls["group"].setValue(group);
    }
  }
}
