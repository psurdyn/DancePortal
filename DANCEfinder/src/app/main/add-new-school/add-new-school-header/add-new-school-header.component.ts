import { Component } from '@angular/core';

import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-add-new-school-header',
  templateUrl: './add-new-school-header.component.html',
  styleUrls: ['./add-new-school-header.component.scss']
})
export class AddNewSchoolHeaderComponent {
  constructor(public service: GlobalService) { }
}
