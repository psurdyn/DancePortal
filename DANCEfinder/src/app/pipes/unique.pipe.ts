import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'unique',
  pure: false
})
export class UniquePipe implements PipeTransform {

  transform(value: any): any {
    if (value !== undefined && value !== null) {
      const coursesArray: {}[] = [];

      for (const course of value) {
        coursesArray.push(course.value);
      }
      return _.uniqBy(coursesArray, 'dance');
    }
    return ["Nie podano"];
  }
}
