import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from, Observable, of } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { ICourseErrorTextMessages } from 'src/app/models/IErrorTextMessages';
import { GlobalService } from 'src/app/services/global.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-new-course',
  templateUrl: './add-new-course.component.html',
  styleUrls: ['./add-new-course.component.scss']
})
export class AddNewCourseComponent implements OnInit {
  public errorTextMessages: ICourseErrorTextMessages = {
    name: "Niepoprawna nazwa",
    level: "Niepoprawna nazwa",
    price: "Niepoprawna cena",
    dance: "Nie wybrano tańca",
  };
  public addNewCourseForm: FormGroup = new FormGroup({
    name: new FormControl(``, [Validators.required]),
    level: new FormControl(`}`, [Validators.required]),
    price: new FormControl(``, [Validators.required]),
    dance: new FormControl(``, [Validators.required]),
  });
  public dances: Observable<object>;
  public levelsOfAdvance: Observable<any>;
  public schoolId: string;

  constructor(
    private service: GlobalService,
    private httpService: HttpService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.service.schoolChange.pipe().subscribe((schoolObject: any) => {
      if (schoolObject) {
        this.schoolId = schoolObject.value.Id;
      }
    });

    this.levelsOfAdvance = this.httpService.getLevelAll();

    this.dances = this.httpService.getKindOfDanceAll()
  }

  public addNewCourse(): void {
    const successMessage: string = "Kurs został dodany!";
    const failureMessage: string = "Kurs nie został dodany!";
    const newCourse = {
      Name: this.addNewCourseForm.get('name').value,
      Price: parseInt(this.addNewCourseForm.get('price').value),
      KindOfDanceId: this.addNewCourseForm.get('dance').value,
      SchoolId: this.schoolId,
      IsActive: true
    }

    this.httpService.putCourseAdd(newCourse).pipe(
      take(1),
      switchMap((id: any) => {
        return this.httpService.putCourseLevelAdd({
          CourseId: id,
          LevelId: this.addNewCourseForm.get('level').value
        })
      }),
      switchMap(() => from(this.router.navigate(['/main'])))
    ).subscribe(
      () => of(this.service.showSuccessSnackbar(successMessage)),
      (error) => of(this.service.showFailureSnackbar(failureMessage))
    )

  }

  private addCourse(course: any): Observable<object> {
    return this.httpService.putCourseAdd(course)
  }

  private addCourseLevel(level: any): Observable<object> {
    return this.httpService.putCourseLevelAdd(level)
  }
}
