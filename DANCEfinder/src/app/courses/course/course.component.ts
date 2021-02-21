import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, Observable, forkJoin, of, EMPTY } from 'rxjs';
import { catchError, map, mergeMap, takeUntil, switchMap, tap, filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  public course: any;
  public course$: Observable<any>;
  public courseLevel: Observable<any>;
  public groups: Observable<any[]>;
  public schoolKey: string;
  public school: Observable<any>;
  public creationDate: Date;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private service: GlobalService,
    private httpService: HttpService,
    private router: Router,
  ) { }

  public get allPrivilege(): boolean {
    return this.service.allPrivileges
  }

  public ngOnInit(): void {

    this.creationDate = this.randomDate();

    this.service.courseChange.pipe(
      takeUntil(this.destroyed$),
      // tap(res => console.log(res)),
      map((res) => {
        const owned: boolean = this.service.ownedCourse.some((course: any) => course.SchoolId === res.value.SchoolId)
        // res = { ...res, Owned: owned }
        res.value.Owned = owned
        return res;
      }),
      // tap(res => console.log(res)),
    )
      .subscribe((course: any) => {
        this.course = course;
        this.course$ = of(this.course)
          .pipe(
            tap(res => console.log(res)),
            switchMap((res: any) => {
              return this.httpService.getKindOfDanceById(res.value.KindOfDanceId)
            }),
            tap(res => console.log(res)),
          )

        this.courseLevel = this.httpService.getCourseLevelById(course.value.Id)
          .pipe(
            catchError(() => []),
            switchMap((levelId: any) => this.httpService.getLevelAll()
              .pipe(
                // tap(res => console.log(res)),
                map((levels: any[]) => {
                  return levels.find((level: any) => {
                    console.log(level, levelId)
                    return level.Id === levelId.LevelId
                  })
                }),
                // tap(res => console.log(res)),
              )),
            catchError(() => of({})),
          )

        this.school = this.httpService.getSchoolId(course.value.SchoolId)
        // .pipe(tap(res => console.log(res)))

        this.groups = (this.httpService.getStudyGroupByCourse(course.value.Id))
          .pipe(
            mergeMap((values: any[]) => {
              let apiArray = values.map(eachValue => {
                return this.httpService.getPersonById(eachValue.InstructorId);
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
            }),
            mergeMap((groups) => {
              let apiArray = groups.map(eachValue => {
                return this.httpService.getRoomById(eachValue.RoomId);
              });

              return forkJoin(apiArray).pipe(
                map((apiData: any[]) => {
                  groups.forEach((eachOriginalValue, index) => {
                    eachOriginalValue.RoomNumber = apiData[index].RoomNumber;
                  });
                  return groups;
                }),
                catchError(e => {
                  return of(e);
                })
              );
            }),
            map((groups: any[], index: number) => {
              // console.log(groups)
              if (groups && groups.length > 0) {
                return groups.map((group) => {
                  return {
                    ...group,
                    StartDay: this.service.getDay(group.StartDate)
                  }
                })
              } else {
                return null;
              }

            }),
            // tap(res => console.log(res))
          )
      });

    this.service.courseSchoolKey = this.schoolKey;
    this.service.courseKey = this.course.key;
  }

  public close(): void {
    // this.location.back()
    this.router.navigate(["/kursy"]);
  }

  public getGroupData(group: any): void {
    this.service.groupToSignUp = group;
  }


  public deleteCourse(): void {
    const backUrl = '/kursy'
    const confirmationMessage: string = "Czy na pewno chcesz usunąć kurs?";
    const successMessage: string = "Kurs został usunięty.";
    const element = {
      "course": this.course.value.Id
    };


    this.service.redirectToConfirmation(element, confirmationMessage, successMessage, backUrl);
  }

  public deleteGroup(group): void {
    const backUrl: string = "/kursy";
    const confirmationMessage: string = "Czy na pewno chcesz usunąć grupę zajęciową?";
    const successMessage: string = "Grupa zajęciowa został usunięty.";
    const element = {
      "group": group.value.Id
    };
    this.service.redirectToConfirmation(element, confirmationMessage, successMessage, backUrl);
  }

  public randomDate() {
    const start: Date = new Date(Date.now() - 31402978311 * Math.random());
    const end: Date = new Date(Date.now())
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}
