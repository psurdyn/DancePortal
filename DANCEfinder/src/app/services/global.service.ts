import { HttpService } from 'src/app/services/http.service';

import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, forkJoin, EMPTY, throwError } from 'rxjs';

import { Group } from '../models/Group';
import { IGroupExpanded } from '../models/IGroupExpanded';

import { of } from 'rxjs';
import { switchMap, mergeMap, catchError, map, take, tap, filter } from 'rxjs/operators';
import { Day } from '../models/Day';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public isLoading: boolean = false;
  public searchTerm: string;
  public searchTermChange: Subject<string> = new Subject<string>();
  public isActiveUser: boolean = false;
  public isSchoolModalVisible: boolean = false;
  public updateSchoolList$: BehaviorSubject<any> = new BehaviorSubject(null);
  public schools: BehaviorSubject<any> = new BehaviorSubject(null);
  public courses: BehaviorSubject<any> = new BehaviorSubject(null);
  public account: BehaviorSubject<any> = new BehaviorSubject(null);
  public courseChange: BehaviorSubject<any> = new BehaviorSubject(null);
  public instructors: BehaviorSubject<any> = new BehaviorSubject(null);
  public students: BehaviorSubject<any> = new BehaviorSubject(null);
  public schoolChange: BehaviorSubject<Array<object>> = new BehaviorSubject<Array<object>>(null);
  public commentsChange: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public onCoursesChange: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public isConfirmationSnackbarOpen: boolean = false;
  public isSuccessSnackbarOpen: boolean = false;
  public isFailureSnackbarOpen: boolean = false;
  public elementToDelete: any;
  public confirmationSnackbarMessage: string;
  public successSnackbarMessage: string;
  public courseSchoolKey: string;
  public courseKey: string;
  public groupToSignUp: IGroupExpanded;
  public signUpGroupKey: string;
  public signUpCourseKey: string;
  public userData: any;
  public group: typeof Group = Group;
  public schoolOwner: string;
  public useWithoutLogin: boolean = false;
  public accessToken: string;
  public backLocalizationUrl: string;
  public ownedSchools: any[] = [];
  public ownedCourse: any[] = [];
  public school: any;
  private schoolKey: string;

  constructor(
    private router: Router,
    private httpService: HttpService) {
    if (localStorage.getItem('token')) {
      this.updateData().subscribe();
    }
  }

  public resetSearchTerm(): void {
    this.searchTermChange.next('')
  }
  public updateData(): Observable<void> {
    this.searchTermChange.next('')
    this.updateUserDetails();
    this.checkRole().pipe(catchError((err) => EMPTY));

    return this.getUser().pipe(
      take(1),
      catchError((err) => EMPTY),
      switchMap((user) => {
        this.userData = user;
        return this.checkRole();
      }),
      switchMap(() => {
        if (this.ownerPrivileges) {
          return this.getOwnedSchools()
        }
        return of([])
      }),
      map((schools: any) => {
        this.ownedSchools = schools
      }));
  }

  public getOwnedSchools(): Observable<object> {
    return this.httpService.getSchoolOwnerById(localStorage.getItem('userId')).pipe(catchError(() => of([])));
  }

  public getOwnedCourse(ownedSchool: any): Observable<object> {
    return this.httpService.getCourseAll()
      .pipe(
        // tap((res) => console.log(res, ownedSchool)),
        catchError(() => of([])),
        map((courses: any[]) => {
          return courses.filter((course: any) => {
            return ownedSchool.some((school) => school.SchoolId === course.SchoolId)
          })
        }),
        // tap((res) => console.log(res)),
        tap((res: any[]) => this.ownedCourse = res),
      );
  }


  public getUser(): Observable<any> {
    const userEmail = localStorage.getItem('userEmail');
    return this.getPersonId(userEmail)
      .pipe(take(1), catchError((err) => EMPTY))
  }

  public get instructorPrivileges(): boolean {
    if (this.userData) {
      return this.userData.role === 'Instructor';
    }
    return false;
  }

  public get ownerPrivileges(): boolean {
    if (this.userData) {
      return this.userData.role === 'Owner';
    }
    return false;
  }

  public get allPrivileges(): boolean {
    if (this.userData) {
      return this.userData.role === 'Admin';
    }
    return false;
  }

  public set setPrivileges(role: string) {
    this.userData.role = role;
  }

  public get schoolOwnerPrivileges(): boolean {
    return this.ownerPrivileges && this.schoolOwner === localStorage.getItem('userId') ? true : false;
  }

  public updateUserDetails(): void {
    const userEmail = localStorage.getItem('userEmail');
    this.getPersonId(userEmail)
      .pipe(
        take(1),
        tap((user) => {
          this.userData = { ...this.userData, ...user }
        }),
        switchMap((user: any) => {
          return this.getOwnedSchools();
        }),
        tap((ownedSchool: any) => {
          this.ownedSchools = ownedSchool;
        }),
        switchMap((ownedSchool: any) => {
          return this.getOwnedCourse(ownedSchool);
        }),
        tap((ownedCourse: any) => {
          this.ownedCourse = ownedCourse;
        }),
        catchError(() => EMPTY))
      .subscribe((ownedCourse: any) => {
        this.ownedCourse = ownedCourse;
        // console.log(
        //   this.userData,
        //   this.ownedCourse,
        //   this.ownedSchools
        // )
      })
  }

  public isAddSchoolModalVisible(): void {
    this.isSchoolModalVisible = !this.isSchoolModalVisible;
  }

  public showSchool(school): void {
    this.schoolChange.next(school);
  }

  public showCourse(course): void {
    this.courseChange.next(course);
  }

  public getSchoolKey(key: string): string {
    return this.schoolKey = key;
  }

  public signUpToCourse(signUpForm?: FormGroup): void {

    this.router.navigate(["/main"]);
  }

  public redirectToConfirmation(element: {}, confirmationMessage: string, successMessage: string, backLocalizationUrl?: string): void {
    this.isConfirmationSnackbarOpen = true;
    this.elementToDelete = element;
    this.confirmationSnackbarMessage = confirmationMessage;
    this.successSnackbarMessage = successMessage;
    this.backLocalizationUrl = backLocalizationUrl;
  }

  public approveDeleteAction(): void {
    if (this.elementToDelete.opinion) {
      this.deleteOpinion(this.elementToDelete.opinion);
    }
    if (this.elementToDelete.school) {
      this.deleteSchool(this.elementToDelete.school)
    }

    if (this.elementToDelete.course) {
      this.deleteCourse(this.elementToDelete.course);
    }
    if (this.elementToDelete.classroom) {
      this.deleteClassroom(this.elementToDelete.classroom);
    }
    if (this.elementToDelete.group) {
      this.deleteGroup(this.elementToDelete.group);
    }
  }

  public denyDeleteAction(): void {
    // if (this.backLocalizationUrl) {
    //   this.router.navigate([this.backLocalizationUrl]);
    //   this.backLocalizationUrl = null;
    // } else {
    for (const element of Object.keys(this.elementToDelete)) {
      if (element === "course" || element === "group") {
        this.router.navigate([`/kursy/${element}`]);
      } else {
        this.router.navigate([`/main/${element}`]);
      }
    }
    // }
  }

  public showSuccessSnackbar(successMessage: string, backUrl?: string): void {
    if (backUrl) {
      this.backLocalizationUrl = backUrl;
    }
    this.successSnackbarMessage = successMessage;
    this.isSuccessSnackbarOpen = true;
  }

  public showFailureSnackbar(failureMessage: string, backUrl?: string): void {
    if (backUrl) {
      this.backLocalizationUrl = backUrl;
    }
    this.successSnackbarMessage = failureMessage;
    this.isFailureSnackbarOpen = true;
  }


  public refreshData() {
    this.isSuccessSnackbarOpen = false;
    this.isFailureSnackbarOpen = false;
    this.isSchoolModalVisible = false;
    return forkJoin([
      this.getSchools(),
      this.getCourses()
    ])
      .pipe(take(1),
        switchMap((result) => {
          this.schools.next(result[0])
          this.courses.next(result[1])
          return of(result[0])
        }))
  }

  public getDay(date: string): Day {
    switch (new Date(date).getDay()) {
      case 0:
        return Day.SUNDAY;
      case 1:
        return Day.MONDAY;
      case 2:
        return Day.TUESDAY;
      case 3:
        return Day.WEDNESDAY;
      case 4:
        return Day.THURSDAY;
      case 5:
        return Day.FRIDAY;
      case 6:
        return Day.SATURDAY;
    }
  }

  public getPersonId(email): Observable<any> {
    return this.httpService.postPersonGetByEmail(email);
  }

  public checkRole(): Observable<any> {
    if (!this.userData) {
      return of({});
    }
    const userId = localStorage.getItem('userId')
    const getAdmin = this.httpService.getAdministratorById(userId).pipe(catchError(() => of([])), map((res) => res));
    const getOwner = this.httpService.getOwnerById(userId).pipe(catchError(() => of([])), map((res) => res));
    const getInstructor = this.httpService.getInstructorById(userId).pipe(catchError(() => of([])), map((res) => res));
    const getClient = this.httpService.getClientById(userId).pipe(catchError(() => of([])), map((res) => res));

    return forkJoin([
      getAdmin,
      getOwner,
      getInstructor,
      getClient,
    ]).pipe(
      catchError((err) => EMPTY),
      map((result: any[]) => {
        let role: string;

        if (result[0].Id) {
          this.setPrivileges = 'Admin';
          return role;
        }

        if (result[1].Id) {
          this.setPrivileges = 'Owner';
          return role;
        }

        if (result[2].Id) {
          this.setPrivileges = 'Instructor';
          return role;
        }

        this.setPrivileges = 'Client';
        return role;
      })
    );
  }

  private getSchools(): Observable<object> {
    return this.httpService.getSchoolAll()
  }

  private getCourses(): Observable<object> {
    return this.httpService.getCourseAll()
  }

  private deleteSchool(school: any): void {

    this.httpService.postSchoolRemoveById(school).pipe(take(1))
      .subscribe(
        () => {
          this.isSuccessSnackbarOpen = true;
          this.backLocalizationUrl = '/main'
        },
        (error) => {
          this.successSnackbarMessage = 'Nie udało sie usunąć szkoły, sprawdź czy nie posiadada opini lub kursu';
          this.isFailureSnackbarOpen = true;
        }
      );
  }

  private deleteOpinion(id: string): void {
    this.httpService.deleteCommentById(id)
      .pipe(
        take(1),
        switchMap(() => this.refreshData())
      )
      .subscribe(
        () => {
          this.commentsChange.next(id)
          this.isSuccessSnackbarOpen = true;
        },
        (error) => {
          this.successSnackbarMessage = 'Nie udało sie usunąć opini';
          this.isFailureSnackbarOpen = true;
        }
      );
  }

  private deleteCourse(course: any): void {
    this.httpService.getCourseLevelAll()
      .pipe(
        take(1),
        map((res: any[]) => {
          if (res.length) {
            return res.filter((courseLevel) => {
              return courseLevel.CourseId === course
            })
          } else {
            return [];
          }
        }),
        switchMap((courseLevel: any) => {
          return courseLevel ? this.httpService.postCourseLevelRemove(courseLevel) : of({})
        }),
        switchMap(() => this.httpService.postCourseRemoveById(course)),
      ).subscribe(
        (element) => {
          this.onCoursesChange.next(course);
          this.isSuccessSnackbarOpen = true;
          this.showSuccessSnackbar('Pomyślnie kurs został usunięty')
        },
        (error) => {
          this.successSnackbarMessage = 'Nie udało sie usunąć kursu, prawdopodobnie dlatego że kurs zawiera grupę/y, które trzeba usunąć przed usunięciem kursu';
          this.isFailureSnackbarOpen = true;
          this.showFailureSnackbar(this.successSnackbarMessage, `kursy/${this.courseKey}`)
        }
      );
  }

  private deleteClassroom(room: any): void {
    this.httpService.postRoomRemoveById(room).pipe(take(1)).subscribe(
      () => { this.isSuccessSnackbarOpen = true; },
      (error) => {
        this.successSnackbarMessage = 'Nie udało sie usunąć pokoju!';
        this.isFailureSnackbarOpen = true;
      }
    )
  }

  private deleteGroup(group: any): void {
    this.httpService.deleteClientGroupById(group).pipe(
      take(1),
      switchMap(() => this.httpService.postStudyGroupRemoveById(group))
    ).subscribe(
      () => { this.isSuccessSnackbarOpen = true; },
      (error) => {
        this.successSnackbarMessage = 'Nie udało sie usunąć grupy!';
        this.isFailureSnackbarOpen = true;
      }
    );
  }
}
