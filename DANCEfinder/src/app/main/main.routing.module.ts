import { RoleResolver } from './../resolver/role.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedGuard } from './../logged.guard';
import { MainComponent } from './main.component';
import { PrivilegesGuard } from './privileges.guard';
import { AddNewClassroomComponent } from './school/add-new-classroom/add-new-classroom.component';
import { AddNewCourseComponent } from './school/add-new-course/add-new-course.component';
import { AddNewInstructorComponent } from './school/add-new-instructor/add-new-instructor.component';
import { AddNewStudentComponent } from './school/schedule/add-new-student/add-new-student.component';
import { ScheduleComponent } from './school/schedule/schedule.component';
import { SignUpComponent } from './school/schedule/sign-up/sign-up.component';
import { StudentsListComponent } from './school/schedule/students-list/students-list.component';
import { SchoolComponent } from './school/school.component';


const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [LoggedGuard],
    resolve: {
      role: RoleResolver
    }
  },
  {
    path: 'main/:school-id',
    component: SchoolComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: 'main/:school-id/dodaj-kurs',
    component: AddNewCourseComponent,
    canActivate: [LoggedGuard, PrivilegesGuard],
  },
  {
    path: 'main/:school-id/dodaj-sale',
    component: AddNewClassroomComponent,
    canActivate: [LoggedGuard, PrivilegesGuard],
  },
  {
    path: 'main/:school-id/dodaj-instruktora',
    component: AddNewInstructorComponent,
    canActivate: [LoggedGuard, PrivilegesGuard],
  },
  {
    path: 'main/:school-id/grafik',
    component: ScheduleComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: 'main/:school-id/grafik/zapisz-sie',
    component: SignUpComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: 'main/:school-id/grafik/dodaj-kursanta',
    component: AddNewStudentComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: 'main/:school-id/grafik/lista-kursantow',
    component: StudentsListComponent,
    canActivate: [LoggedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
