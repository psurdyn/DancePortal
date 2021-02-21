import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { IGroupExpanded } from 'src/app/models/IGroupExpanded';
import { GlobalService } from 'src/app/services/global.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  public group: IGroupExpanded | any = this.service.groupToSignUp;
  public students: Observable<any>;


  public get groupKey(): string {
    return this.group.value.key;
  }

  constructor(
    private service: GlobalService,
    private httpService: HttpService
  ) { }

  public ngOnInit(): void {

    this.students = this.httpService.getClientGroupAll()
      .pipe(
        map((res: any[]) => {
          // console.log(this.group)
          return res.filter(element => element.StudyGroupId === this.group.value.Id)
        }),
        mergeMap((clients: any[]) => {
          const apiData = clients.map(eachValue => {
            return this.httpService.getPersonById(eachValue.ClientId);
          });

          return forkJoin(apiData).pipe(
            map((apiData: any[]) => {
              clients.forEach((eachOriginalValue, index) => {
                eachOriginalValue.data = apiData[index];
              });
              return clients;
            }),
            catchError(e => {
              return of(e);
            })
          )
        })
      );
  }
}
