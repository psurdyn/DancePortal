import { Component, OnInit } from '@angular/core';
import { ReplaySubject, Observable, forkJoin, of } from 'rxjs';
import { take, takeUntil, tap, switchMap, catchError } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public chartReady: boolean;
  public pieChartLabels: string[] = ['Szkoły', 'Kursy', 'Opinie'];
  public pieChartData: number[] = [];
  public pieChartType: string = 'pie';
  public searchTerm: string;
  public schools: any;
  public courses: any;
  public showSchools: any;
  public groups: any;
  public opinions: any;
  public isSchoolsExists: boolean;
  public isEmptySearchResult: boolean = false;
  public elements: number = 4;
  public kindOfDance: any;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  public get useWithoutLogin(): boolean {
    return this.service.useWithoutLogin;
  }

  constructor(
    public service: GlobalService,
    private httpService: HttpService) {
    this.service.updateUserDetails();
  }

  public get schoolsAmount(): number {
    if (this.schools) {
      return Object.keys(this.schools).length;
    }
    return 0;
  }

  public get groupsAmount(): number {
    if (this.groups) {
      return this.groups.length;
    }
    return 0;
  }

  public get opinionsAmount(): number {
    if (this.opinions) {
      return this.opinions.length;
    }
    return 0;
  }

  public get ownerPrivileges(): boolean {
    return this.service.ownerPrivileges;
  }

  public get allPrivileges(): boolean {
    return this.service.allPrivileges;
  }

  public ngOnInit(): void {
    this.service.resetSearchTerm();

    of(this.service.updateUserDetails()).pipe(
      switchMap(() => {
        return this.service.updateSchoolList$.pipe(
          switchMap(() => {
            return this.updateData()
          })
        )
      })).subscribe((result: any) => {
        setTimeout(() => {
          const fullDataSchool = result[0].map((school) => {
            const courses: any[] = result[1]
              .filter((course) => course.SchoolId === school.Id)
              .map((filteredCourses: any) => {
                const dance = result[3].filter((dance: any) => filteredCourses.KindOfDanceId === dance.Id).map((dance) => dance.Name)
                return dance;
              })
            const dances = courses.join(', ')
            // console.log(this.service.ownedSchools)
            const owned = this.service.ownedSchools.some(res => res.SchoolId === school.Id)

            const res = {
              ...school,
              KindsOfDance: dances,
              Owned: owned
            }
            // console.log(res)
            return res;
          });
          this.schools = fullDataSchool;
          this.showSchools = fullDataSchool;
          this.service.schools.next(fullDataSchool)
        }, 100)
      });


    this.service.searchTermChange
      .pipe(takeUntil(this.destroyed$))
      .subscribe((term: string) => {
        this.searchTerm = term
        const filteredSchools = this.schools.filter((school) => {
          return (school.Name as string).toLowerCase().trim().includes(term.trim().toLowerCase())
            || (school.KindsOfDance as string).toLowerCase().trim().includes(term.trim().toLowerCase())
            || (school.City as string).toLowerCase().trim().includes(term.trim().toLowerCase())
            || (school.Street as string).toLowerCase().trim().includes(term.trim().toLowerCase())
            || (school.PostalCode as string).toLowerCase().trim().includes(term.trim().toLowerCase())
        })
        filteredSchools.length > 0 ? this.isEmptySearchResult = false : this.isEmptySearchResult = true;
        this.showSchools = filteredSchools;
      });





  }

  public showSchool(school): void {
    this.service.getSchoolKey(school.key);
    this.service.showSchool(school);
  }

  public showMoreElements(): number {
    return this.elements >= this.schoolsAmount ? this.elements = this.schoolsAmount : this.elements += 4;
  }

  public showLessElements(): number {
    return this.elements > 4 && this.elements <= this.schoolsAmount ? this.elements -= 4 : this.elements = this.schoolsAmount;
  }

  private getChartData(schools, groupsArray, opinionsArray): boolean {
    this.pieChartData = [Object.keys(schools).length, groupsArray.length, opinionsArray.length];
    return this.chartReady = true;
  }

  private getSchools(): Observable<object> {
    return this.httpService.getSchoolAll().pipe(takeUntil(this.destroyed$), tap((result) => {
      result ? this.isSchoolsExists = true : this.isSchoolsExists = false;
    }))
  }

  private getCourses(): Observable<object> {
    return this.httpService.getCourseAll().pipe(takeUntil(this.destroyed$))
  }


  private getComments(): Observable<object> {
    return of([1, 2, 3, 4])
  }



  private updateData(): Observable<any> {

    const getOwner: Observable<any> = this.ownerPrivileges ? this.service.getOwnedSchools() : of([]);

    return forkJoin([
      this.getSchools(),
      this.getCourses(),
      this.getComments(),
      this.httpService.getKindOfDanceAll(),
      getOwner
    ]).pipe(take(1))
  }
}
