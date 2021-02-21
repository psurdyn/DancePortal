import { Component, Input } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  @Input()
  public opinions: any;
  public date: Date = new Date(Date.now());

  constructor(private service: GlobalService) { }

  public get allPrivileges(): boolean {
    return this.service.allPrivileges;
  }

  public get useWithoutLogin(): boolean {
    return this.service.useWithoutLogin;
  }

  public deleteOpinion(opinion): void {
    const confirmationMessage: string = "Czy na pewno chcesz usunąć opinię?";
    const successMessage: string = "Opinia została usunięta.";
    const element = {
      "opinion": opinion.value.Id
    };
    this.service.redirectToConfirmation(element, confirmationMessage, successMessage);
  }
}
