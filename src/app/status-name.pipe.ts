import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusName'
})
export class StatusNamePipe implements PipeTransform {
  private statusNameMap = {
    "pending": "Pendent",
    "pendingUser": "Pendent de l'usuari",
    "progress": "En curs",
    "closed": "Tancat"
  }

  transform(value: string): string {
    return this.statusNameMap[value]
  }

}
