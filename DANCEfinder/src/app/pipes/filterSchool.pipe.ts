import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSchool'
})
export class FilterSchoolPipe implements PipeTransform {
  transform(schools, searchTerm: string): any {
    if (!schools || !searchTerm) {
      return schools;
    }

    const schoolsArray: any[] = [];

    function getSchoolParameter(parameter) {
      const regex = new RegExp(searchTerm, 'i');
      return parameter && parameter.match(regex);
    }

    for (const school in schools) {
      if (schools[school]) {
        for (const course in schools[school].value.courses) {
          if (schools[school].value.courses[course]) {
            if (
              getSchoolParameter(schools[school].value.schoolName) ||
              getSchoolParameter(schools[school].value.courses[course].dance) ||
              getSchoolParameter(schools[school].value.postalCode) ||
              getSchoolParameter(schools[school].value.city) ||
              getSchoolParameter(schools[school].value.street) ||
              getSchoolParameter(schools[school].value.phoneNumber) ||
              getSchoolParameter(schools[school].value.email)
            ) {
              schoolsArray.includes(schools[school]) ? '' : schoolsArray.push(schools[school]);
            }
          }
        }
      }
    }
    return schoolsArray;
  }
}
