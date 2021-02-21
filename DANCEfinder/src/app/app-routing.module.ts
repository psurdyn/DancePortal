import { ClientListComponent } from './courses/course/students-list/client-list.component';
import { OrdersComponent } from './orders/orders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AddNewGroupComponent } from './courses/course/add-new-group/add-new-group.component';
import { CourseComponent } from './courses/course/course.component';
import { CoursesComponent } from './courses/courses.component';
import { LoggedGuard } from './logged.guard';
import { PrivilegesGuard } from './main/privileges.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';


const routes: Routes = [
  {
    path: 'root',
    component: AppComponent
  },
  {
    path: 'profil-uzytkownika',
    component: UserProfileComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: 'zamowienia',
    component: OrdersComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: 'kursy',
    component: CoursesComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: 'moje-kursy',
    component: MyCoursesComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: 'kursy/:course-id',
    component: CourseComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: 'kursy/:course-id/dodaj-grupe-zajeciowa',
    component: AddNewGroupComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: 'kursy/:course-id/lista-kursantow',
    component: ClientListComponent,
    canActivate: [LoggedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
