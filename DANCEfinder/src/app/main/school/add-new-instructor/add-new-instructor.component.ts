import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { mergeMap, take, switchMap } from 'rxjs/operators';
import { IInstructorErrorTextMessages } from 'src/app/models/IErrorTextMessages';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-new-instructor',
  templateUrl: './add-new-instructor.component.html',
  styleUrls: ['./add-new-instructor.component.scss']
})
export class AddNewInstructorComponent implements OnInit {
  public errorTextMessages: IInstructorErrorTextMessages = {
    instructor: "Nie wybrano instruktora",
  };
  public addNewInstructorForm: FormGroup = new FormGroup({
    instructor: new FormControl(``, [Validators.required]),
  });
  public instructors: Observable<any>;


  constructor(private service: GlobalService,
    private httpService: HttpService
  ) { }

  public ngOnInit(): void {

    this.instructors = this.httpService.getPersonAll()
      .pipe(
        take(1),
        mergeMap((persons: any[]) => {
          return this.httpService.getInstructorAll().pipe(
            switchMap((instructors: any[]) => {
              return of(persons.filter((person) => !instructors.some((instructor) => person.Id === instructor.PersonId)))
            })
          )
        })
      )
  }

  public addNewInstructor(): void {
    const successMessage: string = "Instruktor został dodany!";
    const failureMessage: string = "Instruktor nie został dodany!";
    this.httpService.putInstructorAdd({ PersonId: this.addNewInstructorForm.value.instructor })
      .pipe(take(1)).subscribe(
        () => { this.service.showSuccessSnackbar(successMessage); },
        (error) => { this.service.showFailureSnackbar(failureMessage); },
      );
    // this.service.addNewInstructor(this.addNewInstructorForm);

  }
}
