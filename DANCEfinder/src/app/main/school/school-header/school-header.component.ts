import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-school-header',
  templateUrl: './school-header.component.html',
  styleUrls: ['./school-header.component.scss']
})
export class SchoolHeaderComponent {
  constructor(private router: Router) { }

  public close(): void {
    this.router.navigate(["/main"]);
  }
}
