import { Component } from '@angular/core';

import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-add-new-school',
  templateUrl: './add-new-school.component.html',
  styleUrls: ['./add-new-school.component.scss']
})
export class AddNewSchoolComponent {
  constructor(public service: GlobalService) { }
}
