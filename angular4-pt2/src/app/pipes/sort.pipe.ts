import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})

export class SortPipe implements PipeTransform {

  constructor() {}

  transform(items: string[], field: string, order: string, query: string): any[] {
    items.sort((a: any, b: any): any => {
      const comparison = a[field] > b[field];
      console.log(comparison);
      if (order === 'desc') {
        console.log(comparison);
        return !comparison;
      } else if (order === 'asc') {
        console.log(comparison);
        return comparison;
      }
      return comparison;
    });

    if (query) {
      return items.filter((item: any) => {
        return item.firstName.includes(query) ||
          item.lastName.includes(query) ||
          item.email.includes(query);
      });
    }

    return items;
  }

}
