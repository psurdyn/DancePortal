import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { SharedModule } from 'src/app/shared/shared.module';

import { CoursesComponent } from '../courses/courses.component';
import { FilterCoursePipe } from '../pipes/filterCourse.pipe';
import { FilterSchoolPipe } from '../pipes/filterSchool.pipe';
import { ReversePipe } from '../pipes/reverse.pipe';
import { UniquePipe } from '../pipes/unique.pipe';
import { AddNewSchoolFooterComponent } from './add-new-school/add-new-school-footer/add-new-school-footer.component';
import { AddNewSchoolHeaderComponent } from './add-new-school/add-new-school-header/add-new-school-header.component';
import { AddNewSchoolMainComponent } from './add-new-school/add-new-school-main/add-new-school-main.component';
import { AddNewSchoolComponent } from './add-new-school/add-new-school.component';
import { MainComponent } from './main.component';
import { AddNewClassroomComponent } from './school/add-new-classroom/add-new-classroom.component';
import { AddNewCourseComponent } from './school/add-new-course/add-new-course.component';
import { AddNewInstructorComponent } from './school/add-new-instructor/add-new-instructor.component';
import { CommentsComponent } from './school/comments/comments.component';
import { ScheduleComponent } from './school/schedule/schedule.component';
import { SignUpComponent } from './school/schedule/sign-up/sign-up.component';
import { SchoolFooterComponent } from './school/school-footer/school-footer.component';
import { SchoolHeaderComponent } from './school/school-header/school-header.component';
import { SchoolMainComponent } from './school/school-main/school-main.component';
import { SchoolComponent } from './school/school.component';
import { AddNewStudentComponent } from './school/schedule/add-new-student/add-new-student.component';
import { StudentsListComponent } from './school/schedule/students-list/students-list.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'

const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    MainComponent,
    AddNewSchoolFooterComponent,
    AddNewSchoolHeaderComponent,
    AddNewSchoolMainComponent,
    SchoolComponent,
    SchoolMainComponent,
    SchoolFooterComponent,
    ReversePipe,
    FilterSchoolPipe,
    FilterCoursePipe,
    UniquePipe,
    AddNewSchoolComponent,
    SchoolHeaderComponent,
    CommentsComponent,
    AddNewCourseComponent,
    CoursesComponent,
    AddNewClassroomComponent,
    AddNewInstructorComponent,
    ScheduleComponent,
    SignUpComponent,
    AddNewStudentComponent,
    StudentsListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    FullCalendarModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
})
export class MainModule { }
