import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { take, switchMap, tap } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-failure-snackbar',
  templateUrl: './failure-snackbar.component.html',
  styleUrls: ['./failure-snackbar.component.scss']
})
export class FailureSnackbarComponent {
  @Input()
  public errorMessage: string;

  constructor(
    private router: Router,
    private service: GlobalService
  ) { }

  public goToDashboard(): void {
    this.service.refreshData().pipe(
      take(1),
      switchMap((data) => {
        this.service.schools.next(data);
        return this.service.schools;
      }),
      tap(() => {
        if (this.service.backLocalizationUrl) {
          this.router.navigate([this.service.backLocalizationUrl]);
          this.service.backLocalizationUrl = null;
        } else {
          return;
        }
      })
    ).subscribe();
  }
}
