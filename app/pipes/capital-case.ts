import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalcase'
})
export class CapitalCasePipe implements PipeTransform {
  transform(value: string, args: any[]): string {
    if (!value) return 'MyTeam';
    return value.split(' ').map((s: string) => s[0].toUpperCase() + s.substring(1)).join(' ');
  }
}