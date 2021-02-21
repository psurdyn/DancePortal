import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, Observable } from 'rxjs';
import { map, switchMap, takeUntil, tap, } from 'rxjs/operators';

import { IAccountErrorTextMessages } from '../models/IErrorTextMessages';
import { GlobalService } from './../services/global.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public dances: any[];
  public rooms: any[];
  public account: any;
  public updateUserDataForm: FormGroup;
  public errorTextMessages: IAccountErrorTextMessages = {
    name: "Pole nie może być puste",
    surname: "Pole nie może być puste",
    phone: "Pole nie może być puste",
    sex: "Nie wybrano płci",
  };

  public studyGroups: Observable<any[]>;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(public service: GlobalService, private httpService: HttpService) { }

  public ngOnInit(): void {

    this.updateUserDataForm = new FormGroup({
      name: new FormControl('', [Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$')]),
      surname: new FormControl('', [Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$')]),
      phone: new FormControl('', [Validators.pattern(/\d/), Validators.maxLength(9), Validators.minLength(9), Validators.required]),
      sex: new FormControl('', [Validators.required]),
    });

    this.service.account
      .pipe(
        takeUntil(this.destroyed$),
        switchMap((account: any) => {
          this.account = account
          return this.httpService.getClientGroupAll()
            .pipe(
              switchMap((clientGroups: any[]) => {
                return this.httpService.getPersonByAspNetUserId(this.account.AspNetUserId)
                  .pipe(
                    tap((details: any) => {
                      this.updateUserDataForm.patchValue({
                        name: details.FirstName,
                        surname: details.LastName,
                        phone: details.TelephoneNumber,
                        sex: details.Sex
                      })
                    }),
                    map((result: any) => {
                      const groups = clientGroups.filter(group => group.ClientId === result.Id);
                      return { ...result, groups }
                    }),
                  )
              }),
              map((details: any) => {
                // console.log(details)
                this.updateUserDataForm.patchValue({
                  name: details.FirstName,
                  surname: details.LastName,
                  phone: details.TelephoneNumber,
                  sex: details.Sex
                })
                return details;
              }),
            )
        })).subscribe();
  }

  public updateUserData() {

    this.httpService.postPersonUpdate({
      Id: localStorage.getItem('userId'),
      AspNetUserId: this.account.AspNetUserId,
      FirstName: this.updateUserDataForm.get('name').value,
      LastName: this.updateUserDataForm.get('surname').value,
      Sex: this.updateUserDataForm.get('sex').value,
      Email: this.account.Email,
      TelephoneNumber: this.updateUserDataForm.get('phone').value,
    }).subscribe(
      () => {
        this.service.account.next({
          Id: localStorage.getItem('userId'),
          AspNetUserId: this.account.AspNetUserId,
          FirstName: this.updateUserDataForm.get('name').value,
          LastName: this.updateUserDataForm.get('surname').value,
          Sex: this.updateUserDataForm.get('sex').value,
          Email: this.account.Email,
          TelephoneNumber: this.updateUserDataForm.get('phone').value,
        })
        this.showSuccessSnackbar()
      },
      (err) => this.service.showFailureSnackbar('Nie udało sie zaktualizować danych')
    )
  }

  public showSuccessSnackbar(): void {
    const successMessage: string = "Pomyślnie edytowano dane!";
    this.service.showSuccessSnackbar(successMessage);
  }
}
