import { HttpService } from 'src/app/services/http.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Observable, of, ReplaySubject, BehaviorSubject } from 'rxjs';
import { take, takeUntil, switchMap, mergeMap, catchError, map, tap, filter, toArray } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-school-main',
  templateUrl: './school-main.component.html',
  styleUrls: ['./school-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolMainComponent implements OnInit {
  public school: any;
  public schools: any;
  public opinions: Subject<any[]> = new BehaviorSubject([]);
  public currentOpinions: any[];
  public classrooms: Observable<any>;
  public courses: BehaviorSubject<any> = new BehaviorSubject([]);
  public currentCourses: any[];
  public hasAnyClassroom: boolean;
  public opinionForm: FormGroup = new FormGroup({
    opinion: new FormControl(``, [Validators.required])
  });
  public schoolOwnerPrivileges: boolean = false;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private service: GlobalService,
    private httpService: HttpService,
  ) { }

  public get ownerPrivileges(): boolean {
    return this.service.ownerPrivileges;
  }

  public get instructorPrivileges(): boolean {
    return this.service.instructorPrivileges;
  }

  public get allPrivileges(): boolean {
    return this.service.allPrivileges;
  }

  public get useWithoutLogin(): boolean {
    return this.service.useWithoutLogin;
  }

  public ngOnInit(): void {
    this.service.resetSearchTerm();
    this.classrooms = this.httpService.getRoomAll();
    this.opinions.subscribe((op: any[]) => {
      this.currentOpinions = op
    });

    this.setData().pipe(
      switchMap((school: any) => {
        this.school = school
        return this.httpService.getCourseAll()
      }),
      take(1),
      map((courses: any[]) => {
        return courses.filter((course) => course.SchoolId === this.school.value.Id)
      }),
      switchMap((courses: any) => {
        this.currentCourses = courses
        this.courses.next(courses);
        return of(this.school)
      }
      )
    ).subscribe((school: any) => {
      this.setOpinions(school).subscribe((opinions) => {
        this.opinions.next(opinions)
      });
    });

    this.service.onCoursesChange.pipe(
      tap((id) => {
        if (!this.currentCourses) {
          return;
        }
        this.currentCourses = this.currentCourses.filter((course) => course.Id !== id)
      }
      )).subscribe(() => {
        this.courses.next(this.currentCourses);
      })

    this.service.commentsChange.subscribe((id: string) => {
      this.opinions.next(this.currentOpinions.filter((o: any) => o.Id !== id))
    })
  }

  private setData(): Observable<object[]> {
    return this.service.schoolChange.pipe(
      takeUntil(this.destroyed$),
      take(1),
      switchMap((schoolObject: any) => {
        if (this.ownerPrivileges) {
          if (this.service.ownedSchools.some((school) => {
            return school.SchoolId === schoolObject.value.Id
          })) {
            this.schoolOwnerPrivileges = true;
          }
        }
        if (schoolObject) {
          this.school = schoolObject;
        }
        return of(schoolObject);
      }),
      // tap((res) => console.log(res))
    )
  }

  private setOpinions(school: any): Observable<any> {
    return this.httpService.getCommentBySchoolId(school.value.Id)
      .pipe(take(1), takeUntil(this.destroyed$))
  }

  public sendNewOpinion(): void {
    const successMessage: string = "Twoja opinia została dodana!";

    const body = {
      ClientId: localStorage.getItem('userId'),
      SchoolId: this.school.value.Id,
      Text: this.opinionForm.get('opinion').value,
    }

    this.httpService.postCommentAdd(body).pipe(
      take(1),
      switchMap(() => of(this.setData()))
    ).subscribe(
      () => {
        const backLocalizationUrl = `/main`
        this.service.backLocalizationUrl = backLocalizationUrl;
        this.service.showSuccessSnackbar(successMessage);
      },
      () => { this.service.showFailureSnackbar('Nie możesz dodać opini!') },
      () => {
        this.opinionForm.reset();
      }
    );

  }

  public goToCourse(course): void {
    this.service.courseChange.next(course)
    this.service.showCourse(course);
  }

  public deleteSchool(): void {
    const confirmationMessage: string = "Czy na pewno chcesz usunąć szkołę?";
    const successMessage: string = "Szkoła została usunięta.";
    const element = {
      "school": this.school.value.Id
    };
    this.service.redirectToConfirmation(element, confirmationMessage, successMessage);
  }

  public deleteClassroom(classroom): void {
    const confirmationMessage: string = "Czy na pewno chcesz usunąć salę?";
    const successMessage: string = "Sala została usunięta.";
    const backLocalizationUrl = `/main/${this.school.key}`
    const element = {
      "classroom": classroom.value.Id
    };


    this.service.redirectToConfirmation(element, confirmationMessage, successMessage, backLocalizationUrl);
  }

  public deleteCourse(course): void {
    const confirmationMessage: string = "Czy na pewno chcesz usunąć kurs?";
    const successMessage: string = "Kurs został usunięty.";
    const backLocalizationUrl = `/main/${this.school.key}`
    const element = {
      "course": course.value.Id
    };

    this.service.redirectToConfirmation(element, confirmationMessage, successMessage, backLocalizationUrl);
  }
}








