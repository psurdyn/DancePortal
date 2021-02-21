import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public orders: Observable<any>

  constructor(public service: GlobalService, private httpService: HttpService) { }

  public ngOnInit(): void {
    this.orders = this.httpService.getOrderAll()
      .pipe(
        switchMap((orders: any[]) => {
          return this.httpService.getPersonAll().pipe(
            map((persons: any[]) => {
              return orders.map((order) => {

                const person = persons.filter((per) => per.Id === order.ClientId)

                return { ...order, Person: person[0] }
              })
            }))
        }),
      );
  }
}
