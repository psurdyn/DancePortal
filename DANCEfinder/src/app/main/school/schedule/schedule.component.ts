import { group } from '@angular/animations';
import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { Day } from 'src/app/models/Day';
import { IGroupExpanded } from 'src/app/models/IGroupExpanded';

import { GlobalService } from './../../../services/global.service';
import { map, mergeMap, take, switchMap, filter, toArray, tap } from 'rxjs/operators';
import { forkJoin, of, Observable } from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  public groups: any = [];
  public chosenDay: string = Day.MONDAY;
  public days: typeof Day = Day;

  private schoolId: any;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private service: GlobalService,
    private httpService: HttpService,
  ) { }

  public get sortedDays(): Day[] {
    return Object.values(this.days);
  }

  public get instructorPrivileges(): boolean {
    return this.service.instructorPrivileges;
  }

  public get ownerPrivileges(): boolean {
    return this.service.ownerPrivileges;
  }

  public get allPrivileges(): boolean {
    return this.service.allPrivileges;
  }

  public get useWithoutLogin(): boolean {
    return this.service.useWithoutLogin;
  }

  public ngOnInit(): void {

    this.service.schoolChange.pipe(
      take(1),
      takeUntil(this.destroyed$),
      switchMap((values: any) => {
        this.schoolId = values.value.Id
        return this.getAllCoursesInCurrentSchool(values.value.Id)
      }),
      mergeMap((courses) => {
        return this.getGroupsByCourses(courses)
      }),
      mergeMap((coursesAndGroups) => {
        return this.getGroupsDetails(coursesAndGroups);
      }),
      mergeMap((coursesAndGroupsDetails) => {
        return this.getInstructorDetails(coursesAndGroupsDetails);
      }),
      mergeMap((group) => {
        return this.getLevel(group);
      }),
    ).subscribe((courses: any[]) => {
      if (courses) {
        this.groups = courses;
      } else {
        this.groups = []
      }
    });
  }

  public setGroupsByDay(chosenDay: string): string {
    return this.chosenDay = chosenDay;
  }

  public getGroupsByDay(groups: any[]): any {
    return groups.filter((group: any) => {
      return group.startDate === this.chosenDay
    });
  }

  public getGroupData(group: IGroupExpanded): void {
    this.service.groupToSignUp = group;
  }


  private getAllCoursesInCurrentSchool(schoolId: string): Observable<any> {
    return this.httpService.getCourseAll()
      .pipe(
        take(1),
        map((results: any[]) => {
          return results.filter((result: any) => result.SchoolId === schoolId)
        })
      )
  }

  private getGroupsByCourses(courses: any): Observable<any[]> {
    if (courses.length === 0) {
      return of([])
    }
    const currentCourses = []
    let apiArray = courses.map(eachValue => {
      return this.httpService.getStudyGroupByCourse(eachValue.Id);
    });

    return forkJoin(apiArray)
      .pipe(
        take(1),
        mergeMap((apiData: any) => {
          apiData.forEach((element: any, i: number) => {
            if (element.length !== 0) {
              element.forEach((record: any, index: number) => {
                let currentCourse: any = { ...courses[i] };
                currentCourse.data = record;
                currentCourse.startDate = this.service.getDay(record.StartDate);
                currentCourses.push(currentCourse)
              });
            }
          });
          return currentCourses;
        }),
        toArray(),
        mergeMap(result => {
          return of(result)
        })
      )
  }

  private getGroupsDetails(groups: any[]): Observable<any[]> {
    const currentGroup = []
    let apiArray = groups.map((eachValue: any) => {
      return this.getGroupDetails({ instructorId: eachValue.data.InstructorId, kindOfDanceId: eachValue.data.KindOfDanceId, roomId: eachValue.data.RoomId });
    });

    return forkJoin(apiArray)
      .pipe(
        take(1),
        mergeMap((apiData: any[]) => {
          apiData.forEach((element: any, index: number) => {
            groups[index].groupData = element;
            currentGroup.push(groups[index])
          })
          return currentGroup;
        }),
        toArray()
      )
  }

  private getInstructorDetails(groups: any[]): Observable<any[]> {
    const currentGroup = []
    let apiArray = groups.map((eachValue: any) => {
      return this.httpService.getPersonById(eachValue.data.InstructorId);
    });

    return forkJoin(apiArray)
      .pipe(
        take(1),
        mergeMap((apiData: any[]) => {
          apiData.forEach((element: any, index: number) => {
            groups[index].groupData.instructorData.person = element;
            currentGroup.push(groups[index])
          })
          return currentGroup;
        }),
        toArray()
      )
  }

  private getGroupDetails(ids: { instructorId: string, kindOfDanceId: string, roomId: string }): Observable<object> {
    return forkJoin([
      this.getInstructor(ids.instructorId),
      this.getKindOfDance(ids.kindOfDanceId),
      this.getRoom(ids.roomId)])
      .pipe(
        map((result) => {
          return {
            instructorData: result[0],
            kindOfDanceData: result[1],
            roomData: result[2]
          }
        })
      )
  }

  private getLevel(groups: any[]): Observable<any[]> {

    let levelsList: any[];

    return this.httpService.getLevelAll().pipe(
      switchMap((levels: any[]) => {
        levelsList = levels
        return this.httpService.getCourseLevelAll()
          .pipe(
            map((coursesLevel: any[]) => {
              return groups.map((group: any) => {
                const currentLevel: any = coursesLevel.filter((cl: any) => cl.CourseId === group.Id)
                const levelName: any = levelsList.filter((l: any) => {
                  if (currentLevel.length) {
                    return l.Id === currentLevel[0].LevelId
                  }
                  return false;
                });
                return { ...group, Level: levelName[0] }
              })
            }),
          )
      }))
  }

  private getInstructor(id: string): Observable<object> {
    return this.httpService.getInstructorById(id)
  }

  private getKindOfDance(id: string): Observable<object> {
    return this.httpService.getKindOfDanceById(id)
  }

  private getRoom(id: string): Observable<object> {
    return this.httpService.getRoomById(id)
  }
}
