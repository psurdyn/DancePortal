import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, take, tap, filter, toArray } from 'rxjs/operators';

import { GlobalService } from '../services/global.service';
import { setgroups } from 'process';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {

  public groups: Observable<any>
  private clients: any[];

  constructor(public service: GlobalService, private httpService: HttpService) { }

  public ngOnInit(): void {
    if (this.service.instructorPrivileges) {
      this.setInstructorGroups();
    } else if (!this.service.useWithoutLogin && !(this.service.allPrivileges && this.service.ownerPrivileges)) {
      this.setClientGroups();
    } else {
      this.groups = this.httpService.getClientGroupAll()
    }
  }

  public setClientGroups(): void {
    this.groups = this.httpService.getClientGroupAll()
      .pipe(
        map((groups: any[]) => {
          const myGroups = groups.filter((per) => per.ClientId === this.service.userData.Id)
          // console.log(groups, myGroups, this.service.userData)
          return [...myGroups]
        }),
        mergeMap((myGroups: any[]) => {
          let apiArray = myGroups.map(eachValue => {
            return this.httpService.getStudyGroupById(eachValue.StudyGroupId);
          });

          return forkJoin(apiArray).pipe(
            take(1),
            map((apiData: any[]) => {
              myGroups.forEach((eachOriginalValue, index) => {
                eachOriginalValue.group = apiData[index];
              });
              return myGroups;
            }),
            catchError(e => {
              return of(e);
            })
          );
        }),
        tap((res) => console.log(res)),
        mergeMap((groups: any[]) => {
          let apiArray: any = groups.map(group => {
            return forkJoin([
              this.httpService.getCourseById(group.group.CourseId),
              this.httpService.getInstructorById(group.group.InstructorId),
              this.httpService.getKindOfDanceById(group.group.KindOfDanceId),
              this.httpService.getRoomById(group.group.RoomId),
              this.httpService.getSchoolId(group.group.SchoolId),
            ]).pipe(map((res) => {
              return {
                courseData: res[0],
                instructorData: res[1],
                danceData: res[2],
                roomData: res[3],
                schoolData: res[4],
              }
            }))
          });

          return forkJoin(apiArray).pipe(
            take(1),
            map((apiData: any[]) => {
              groups.forEach((eachOriginalValue, index) => {
                eachOriginalValue.data = apiData[index];
              });
              return groups;
            }),
            catchError(e => {
              return of(e);
            })
          );
        }),
        tap((res) => console.log(res)),
      );
  }
  public setInstructorGroups(): void {
    this.groups = this.httpService.getStudyGroupByInstructorId(this.service.userData.Id)
      .pipe(
        // switchMap((groups: any[]) => {
        //   return this.httpService.getPersonAll().pipe(map((users: []) => {
        //     this.clients = users;
        //     return groups;
        //   }));
        // }),
        tap((res) => console.log(res)),
        mergeMap((groups: any[]) => {
          let apiArray: any = groups.map((group: any) => {
            return forkJoin([
              this.httpService.getCourseById(group.CourseId),
              this.httpService.getInstructorById(group.InstructorId),
              this.httpService.getKindOfDanceById(group.KindOfDanceId),
              this.httpService.getRoomById(group.RoomId),
              this.httpService.getSchoolId(group.SchoolId),
              this.httpService.getClientGroupAll(),
            ]).pipe(
              map((res: any) => {
                return {
                  courseData: res[0],
                  instructorData: res[1],
                  danceData: res[2],
                  roomData: res[3],
                  schoolData: res[4],
                  clients: res[5].filter((client: any) => client.StudyGroupId === group.Id),
                }
              }))
          });

          return forkJoin(apiArray).pipe(
            take(1),
            map((apiData: any[]) => {
              groups.forEach((eachOriginalValue, index) => {
                eachOriginalValue.data = apiData[index];
              });
              return groups;
            }),
            catchError(e => {
              return of(e);
            })
          );
        }),
        mergeMap((data: any) => {
          let apiArray = data.map((eachValue: any) => {
            return eachValue.data.clients.map((item) => {
              // console.log(item)
              return this.httpService.getPersonById(item.ClientId)
            })
          });

          apiArray = apiArray.flat();
          // console.log(apiArray)
          return forkJoin(apiArray)
            .pipe(
              take(1),
              mergeMap((apiData: any[]) => {
                // console.log(data)
                return data.map((group: any) => {
                  // console.log(group.data.clients, apiData)
                  return {
                    ...group,
                    clients: group.data.clients.map((client: any) => apiData.find((person: any) => client.ClientId === person.Id))
                  }
                })
              }), toArray());
        }),
        tap((res) => console.log(res)),
      );
  }
}
