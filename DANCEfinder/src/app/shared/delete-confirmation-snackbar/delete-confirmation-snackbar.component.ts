import { Component, Input } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-delete-confirmation-snackbar',
  templateUrl: './delete-confirmation-snackbar.component.html',
  styleUrls: ['./delete-confirmation-snackbar.component.scss']
})
export class DeleteConfirmationSnackbarComponent {
  @Input()
  public errorMessage: string;

  constructor(private service: GlobalService) { }

  public approveDeleteAction(): void {
    this.service.approveDeleteAction();
    this.service.isConfirmationSnackbarOpen = false;
  }

  public denyDeleteAction(): void {
    this.service.denyDeleteAction();
    this.service.isConfirmationSnackbarOpen = false;
  }
}
