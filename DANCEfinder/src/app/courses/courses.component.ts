import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { takeUntil, map, take, catchError, mergeMap, switchMap, tap } from 'rxjs/operators';

import { Group } from '../models/Group';
import { GlobalService } from './../services/global.service';
import { Observable, BehaviorSubject, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public searchTerm: string;
  public isCoursesExists: boolean = true;
  public isEmptySearchResult: boolean = false;
  public coursesArray: any[] = [];
  public showedCourses: any;
  public initCourses: any = [];
  public courses: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public courses$: Observable<any[]>;
  public elements: number = 4;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private service: GlobalService,
    private httpService: HttpService,
  ) { }

  public get coursesAmount(): number {
    return this.coursesArray.length;
  }

  public ngOnInit(): void {
    this.service.resetSearchTerm();
    this.service.searchTermChange
      .pipe(takeUntil(this.destroyed$))
      .subscribe((term: string) => {
        this.searchTerm = term
        const filteredCourses: any[] = this.initCourses.filter((course) => {
          return (course.Name as string).toLowerCase().trim().includes(term.trim().toLowerCase())
        })
        filteredCourses.length > 0 ? this.isEmptySearchResult = false : this.isEmptySearchResult = true;
        this.showedCourses = filteredCourses;
      });

    this.httpService.getCourseAll()
      .pipe(
        take(1),
        takeUntil(this.destroyed$),
        mergeMap((values: any[]) => {
          let apiArray = values.map(eachValue => {
            return this.httpService.getKindOfDanceById(eachValue.KindOfDanceId);
          });

          return forkJoin(apiArray).pipe(
            take(1),
            map((apiData: any[]) => {
              values.forEach((eachOriginalValue, index) => {
                eachOriginalValue.KindOfDance = apiData[index].Name;
              });
              return values;
            }),
            catchError(e => {
              return of(e);
            })
          );
        }),
        switchMap((courses: any) => {
          return this.getLevel(courses)
        }),
        switchMap((courses: any) => {
          return this.getOwned(courses)
        })
      ).subscribe((value) => {
        this.isCoursesExists = true;
        this.initCourses = value
        this.showedCourses = value
        this.courses.next(value)
      })

    this.service.schools.pipe(takeUntil(this.destroyed$)).subscribe((schools: any[]) => {
      for (const school in schools) {
        if (!schools[school].courses || schools[school].courses.length <= 0) {
          return this.isCoursesExists = false;
        }
        this.isCoursesExists = true;
        return this.courses = schools[school].courses;
      }
    });
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
                })
                return { ...group, Level: levelName[0] }
              })
            }),
          )
      }))
  }

  private getOwned(groups: any[]): Observable<any[]> {
    if (this.service.ownerPrivileges) {
      return this.service.getOwnedSchools().pipe(
        map((ownedSchools: any[]) => {
          return groups.map((group: any) => {
            const isOwned: any = ownedSchools.some((owned: any) => owned.SchoolId === group.SchoolId)
            return { ...group, Owned: isOwned }
          })
        }),
      )
    } else {
      return of(groups)
    }
  }

  public showMoreElements(): number {
    return this.elements >= this.coursesAmount ? this.elements = this.coursesAmount : this.elements += 4;
  }

  public showLessElements(): number {
    return this.elements > 4 && this.elements <= this.coursesAmount ? this.elements -= 4 : this.elements = this.coursesAmount;
  }

  public goToCourse(course): void {
    this.service.showCourse(course);
  }
}
