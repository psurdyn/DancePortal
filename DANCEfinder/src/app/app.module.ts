import { MyCoursesComponent } from './my-courses/my-courses.component';
import { OrdersComponent } from './orders/orders.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthRoutingModule } from './auth/auth.routing.module';
import { AddNewGroupComponent } from './courses/course/add-new-group/add-new-group.component';
import { CourseComponent } from './courses/course/course.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainModule } from './main/main.module';
import { MainRoutingModule } from './main/main.routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ClientListComponent } from './courses/course/students-list/client-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
    OrdersComponent,
    CourseComponent,
    AddNewGroupComponent,
    MyCoursesComponent,
    ClientListComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AuthRoutingModule,
    MainModule,
    MainRoutingModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
