import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { take, switchMap, tap } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-success-snackbar',
  templateUrl: './success-snackbar.component.html',
  styleUrls: ['./success-snackbar.component.scss']
})
export class SuccessSnackbarComponent {
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
          // if (this.router.url === '/login') {
          //   this.router.navigate(["/login"]);
          // } else if (this.router.url === '/profil-uzytkownika') {
          //   this.router.navigate(["/profil-uzytkownika"]);
          // } else {
          //   this.router.navigate(["/main"]);
          // }
        }
      })
    ).subscribe();

  }
}
