import { HttpService } from 'src/app/services/http.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IClassroomErrorTextMessages } from 'src/app/models/IErrorTextMessages';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-new-classroom',
  templateUrl: './add-new-classroom.component.html',
  styleUrls: ['./add-new-classroom.component.scss']
})
export class AddNewClassroomComponent {
  public errorTextMessages: IClassroomErrorTextMessages = {
    number: "Niepoprawna nazwa",
  };
  public addNewClassroomForm: FormGroup = new FormGroup({
    number: new FormControl(``, [Validators.required]),
  });

  constructor(
    private service: GlobalService,
    private httpService: HttpService
  ) { }


  public addNewClassroom(): void {
    const successMessage: string = "Sala została dodana!";

    const roomNum = Number.parseInt(this.addNewClassroomForm.value.number)
    this.httpService.putRoomAdd({ RoomNumber: roomNum }).subscribe(() => {
      this.service.showSuccessSnackbar(successMessage);
    })
  }
}
