import { HttpService } from './../../../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IStudentErrorTextMessages } from 'src/app/models/IErrorTextMessages';
import { IGroupExpanded } from 'src/app/models/IGroupExpanded';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-new-student',
  templateUrl: './add-new-student.component.html',
  styleUrls: ['./add-new-student.component.scss']
})
export class AddNewStudentComponent implements OnInit {
  public errorTextMessages: IStudentErrorTextMessages = {
    student: "Nie wybrano kursanta",
  };
  public addNewStudentForm: FormGroup = new FormGroup({
    student: new FormControl(``, [Validators.required]),
  });
  public students: Observable<any[]>;
  private courseKey: string;
  public group: IGroupExpanded | any = this.service.groupToSignUp;


  public get groupKey(): string {
    return this.group.value.key;
  }


  constructor(
    private service: GlobalService,
    private httpService: HttpService
  ) { }

  public ngOnInit(): void {

    this.students = forkJoin([
      this.httpService.getClientAll(),
      this.httpService.getPersonAll()
    ]).pipe(
      tap(() => {
        this.service.signUpGroupKey = this.groupKey;
        this.service.signUpCourseKey = this.courseKey;
      }),
      map((res: any) => {
        return res[0].map((client: any) => {
          const details = res[1].filter((details: any) => details.Id === client.PersonId)
          return { ...client, Data: { ...details[0] } }
        })
      }),
      );
  }

  public addNewStudent(): void {
    const successMessage: string = "Kursant został zapisany na kurs!";
    this.httpService.putClientGroupAdd({
      StudyGroupId: this.group.value.data.Id,
      ClientId: this.addNewStudentForm.get('student').value
    }).subscribe(
      () => { this.service.showSuccessSnackbar(successMessage); },
      () => { this.service.showFailureSnackbar('Nie udało sie dodać kursanta') }
    );

  }
}
