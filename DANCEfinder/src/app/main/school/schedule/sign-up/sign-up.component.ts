import { HttpService } from './../../../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { IPaymentTextMessages } from 'src/app/models/IErrorTextMessages';
import { IGroupExpanded } from 'src/app/models/IGroupExpanded';
import { GlobalService } from 'src/app/services/global.service';

import { EMPTY, forkJoin, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public group: IGroupExpanded | any = this.service.groupToSignUp;
  public orderNumber: string;
  public onlinePayment: boolean = true;
  public discount: number = 0;
  public discountCodes: string[] = [
    "Af24n",
    "N33La",
    "ao90D",
    "d24dO",
    "Pow09",
  ];

  public errorTextMessages: IPaymentTextMessages = {
    accountNumber: "Niepoprawny numer konta",
  };
  public onlinePaymentForm: FormGroup = new FormGroup({
    accountNumber: new FormControl(``, [Validators.required, Validators.pattern(/^\d{26}$/)]),
    discountCode: new FormControl(''),
  });

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private courseKey: string;

  constructor(
    private service: GlobalService,
    private httpService: HttpService,
  ) { }

  public get groupKey(): string {
    return this.group.value.key;
  }

  public ngOnInit(): void {
    this.service.signUpGroupKey = this.groupKey;
    this.service.signUpCourseKey = this.courseKey;
  }

  public changePaymentForm(paymentForm: boolean): boolean {
    return this.onlinePayment = paymentForm;
  }

  public getPrice() {

    if (this.discountCodes.includes(this.onlinePaymentForm.get("discountCode").value)) {
      this.discount = 10;
      return (this.group.value?.Price - this.group.value?.Price / 10)
    } else {
      this.discount = 0;
      return this.group.value?.Price
    }
  }

  public signUpToCourse(): void {
    const addOrder = this.httpService.putOrderAdd({
      ClientId: localStorage.getItem('userId'),
      WholeAmount: this.group.value?.Price,
      OrderDate: new Date(Date.now()).toLocaleDateString(),
      Discount: this.discount
    }).pipe(
      catchError((err) => {
        this.service.showFailureSnackbar('Nie możesz się zapisać na kurs')
        return EMPTY
      })
    )

    const addClientToGroup = this.httpService.putClientGroupAdd({
      StudyGroupId: this.group.value.data.Id,
      ClientId: localStorage.getItem('userId')
    }).pipe(
      catchError((err) => {
        this.service.showFailureSnackbar('Nie możesz się zapisać na kurs')
        return EMPTY
      })
    )

    forkJoin([addOrder, addClientToGroup]).pipe(
      switchMap(() => {
        const successMessage: string = "Pomyślnie zapisano na kurs!";
        if (this.onlinePayment) {
          this.service.signUpToCourse(this.onlinePaymentForm);
        } else {
          this.service.signUpToCourse();
        }
        return of(this.service.showSuccessSnackbar(successMessage));
      })
    ).subscribe();
  }
}
