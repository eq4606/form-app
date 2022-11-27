import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: number): string {
    if (value) {
      var numStr = value.toString();
      if (numStr.charAt(0) === '0') {
        numStr = numStr.slice(0, 1);
      }
      return `0${numStr.slice(0, 2)}-${numStr.slice(2)}`;
    }
    return '';
  }

}
