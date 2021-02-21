import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCourse'
})
export class FilterCoursePipe implements PipeTransform {
  transform(courses, searchTerm: string): any {
    if (!courses || !searchTerm) {
      return courses;
    }

    const coursesArray: any[] = [];

    function getCourseParameter(parameter) {
      const regex = new RegExp(searchTerm, 'i');
      return parameter && parameter.match(regex);
    }

    for (const course in courses) {
      if (courses[course]) {
        if (
          getCourseParameter(courses[course].value.name) ||
          getCourseParameter(courses[course].value.dance) ||
          getCourseParameter(courses[course].value.level) ||
          getCourseParameter(courses[course].value.price) ||
          getCourseParameter(courses[course].value.date)
        ) {
          coursesArray.includes(courses[course]) ? '' : coursesArray.push(courses[course]);
        }
      }
    }
    return coursesArray;
  }
}
