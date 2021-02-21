import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { IGroupErrorTextMessages } from 'src/app/models/IErrorTextMessages';
import { GlobalService } from 'src/app/services/global.service';
import { HttpService } from 'src/app/services/http.service';

import { Day } from './../../../models/Day';

@Component({
  selector: 'app-add-new-group',
  templateUrl: './add-new-group.component.html',
  styleUrls: ['./add-new-group.component.scss']
})
export class AddNewGroupComponent implements OnInit {
  public classrooms: any;
  public instructors: any;
  public courseKey: string;
  public course: any;

  public errorTextMessages: IGroupErrorTextMessages = {
    instructor: "Nie wybrano instruktora",
    noInstructor: "Nie dodano żadnego instruktora do szkoły",
    classroom: "Nie wybrano sali",
    noClassroom: "Nie dodano żadnej sali do szkoły",
    startDate: "Nie wybrano daty",
  };
  public days: typeof Day = Day;
  public addNewGroupForm: FormGroup = new FormGroup({
    instructor: new FormControl(``, [Validators.required]),
    classroom: new FormControl(``, [Validators.required]),
    startDate: new FormControl(``, [Validators.required]),
  });

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private service: GlobalService,
    private httpService: HttpService
  ) { }

  public get sortedDays(): Day[] {
    return Object.values(this.days);
  }

  public ngOnInit(): void {

    this.classrooms = this.httpService.getRoomAll();

    this.instructors = this.httpService.getInstructorAll().pipe(
      mergeMap((values: any[]) => {
        let apiArray = values.map(eachValue => {
          return this.httpService.getPersonById(eachValue.PersonId);
        });

        return forkJoin(apiArray).pipe(
          map((apiData: any[]) => {
            values.forEach((eachOriginalValue, index) => {
              eachOriginalValue.FirstName = apiData[index].FirstName;
              eachOriginalValue.LastName = apiData[index].LastName;
            });
            return values;
          }),
          catchError(e => {
            return of(e);
          })
        );
      })
    )


    this.service.courseChange.pipe(
      takeUntil(this.destroyed$))
      .subscribe((course: any) => {
        this.course = course;
      });
  }

  public addNewGroup(): void {
    const successMessage: string = "Grupa zajęciowa została dodana!";

    this.httpService.putStudyGroupAdd({
      InstructorId: this.addNewGroupForm.get('instructor').value,
      RoomId: this.addNewGroupForm.get('classroom').value,
      CourseId: this.course.value.Id,
      KindOfDanceId: this.course.value.KindOfDanceId,
      SchoolId: this.course.value.SchoolId,
      StartDate: this.addNewGroupForm.get('startDate').value,
    }).pipe(take(1)).subscribe(() => {
      this.service.showSuccessSnackbar(successMessage, '/kursy');
    })
  }
}
