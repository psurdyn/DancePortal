import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { pipe } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ISchoolErrorTextMessages } from 'src/app/models/IErrorTextMessages';
import { HttpService } from 'src/app/services/http.service';

import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-add-new-school-main',
  templateUrl: './add-new-school-main.component.html',
  styleUrls: ['./add-new-school-main.component.scss']
})
export class AddNewSchoolMainComponent {
  public errorTextMessages: ISchoolErrorTextMessages = {
    schoolName: "Niepoprawna nazwa",
    postalCode: "Niepoprawny kod pocztowy",
    city: "Niepoprawny adres",
    street: "Niepoprawny adres",
    website: "Niepoprawny adres",
    phoneNumber: "Niepoprawny numer",
    email: "Niepoprawny e-mail",
    about: "Niepoprawny opis",
  };
  public addSchoolForm: FormGroup = new FormGroup({
    schoolName: new FormControl(``, [Validators.required]),
    postalCode: new FormControl(``, [Validators.required]),
    city: new FormControl(``, [Validators.required]),
    street: new FormControl(``, [Validators.required]),
    website: new FormControl(``, [Validators.required]),
    phoneNumber: new FormControl(``, [Validators.required]),
    email: new FormControl(``, [Validators.required]),
    about: new FormControl(``, [Validators.required]),
  });

  constructor(
    public service: GlobalService,
    public dbService: HttpService,
  ) { }


  public addNewSchool(): void {
    const successMessage: string = "Szkoła została dodana!";
    const failureMessage: string = "Szkoła nie została dodana!";

    const tmpSchool = {
      Name: this.addSchoolForm.get('schoolName').value,
      City: this.addSchoolForm.get('city').value,
      Street: this.addSchoolForm.get('street').value,
      PostalCode: this.addSchoolForm.get('postalCode').value,
      EmailAddress: this.addSchoolForm.get('email').value,
      WebAddress: this.addSchoolForm.get('website').value,
      TelephoneNumber: this.addSchoolForm.get('phoneNumber').value,
      Description: this.addSchoolForm.get('about').value,
      CreationDate: '2021-01-06T13:10:29.494Z',
    }

    if (this.service.ownerPrivileges) {
      this.dbService.putSchoolAdd(tmpSchool)
        .pipe(
          take(1),
          switchMap((id: any) => {
            return this.dbService.putSchoolOwnerAdd({
              SchoolId: id,
              OwnerId: localStorage.getItem('userId'),
            }).pipe(map(() => id))
          })
        ).subscribe(
          (id: any) => {
            this.service.ownedSchools.push({
              SchoolId: id,
              OwnerId: localStorage.getItem('userId'),
            });
            this.service.updateSchoolList$.next(true)
            this.service.showSuccessSnackbar(successMessage);
          },
          (error) => {
            this.service.showFailureSnackbar(failureMessage);
          }
        );

    } else {
      this.dbService.putSchoolAdd(tmpSchool).subscribe(
        () => {
          this.service.updateSchoolList$.next(true)
          this.service.showSuccessSnackbar(successMessage);
        },
        (error) => {
          this.service.showFailureSnackbar(failureMessage);
        }
      );
    }
  }
}
