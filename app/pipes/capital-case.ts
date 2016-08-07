import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalCase'
})
export class CapitalCasePipe implements PipeTransform {
  transform(value: string, args: any[]): string {
    return value.split(' ').map((s: string) => s[0].toUpperCase() + s.substring(1)).join(' ');
  }
}