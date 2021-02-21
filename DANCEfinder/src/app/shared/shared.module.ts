import { FailureSnackbarComponent } from './failure-snackbar/failure-snackbar.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DeleteConfirmationSnackbarComponent } from './delete-confirmation-snackbar/delete-confirmation-snackbar.component';
import { InputErrorComponent } from './input-error/input-error.component';
import { SuccessSnackbarComponent } from './success-snackbar/success-snackbar.component';

@NgModule({
  declarations: [
    InputErrorComponent,
    DeleteConfirmationSnackbarComponent,
    SuccessSnackbarComponent,
    FailureSnackbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputErrorComponent,
    DeleteConfirmationSnackbarComponent,
    SuccessSnackbarComponent,
    FailureSnackbarComponent
  ]
})
export class SharedModule { }
