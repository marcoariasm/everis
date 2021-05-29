
import { map, take, share } from 'rxjs/operators';
import { interval } from 'rxjs';
import { EAfpErrorCode } from '../enums/error-code.enum';

function _to2digit(n: number) {
  if (n > 0) {

    return ('00' + n).slice(-2);
  } else {

    return '00';
  }
}

/**
 * Time interval
 * @param timeInterval time to pass
 */
export function signatureExpire(timeInterval: number) {
  const padding = 2;
  const time = timeInterval + padding;

  return interval(1000).pipe(
    take(time),
    map(value => time - value),
    map(value => {
      const res = {
        value,
        minutes: _to2digit(Math.floor((value - 2) / 60)),
        seconds: _to2digit(Math.floor((value - 2)) % 60),
      };

      return res;
    }),
    share()
  );
}

export function getDateStringFormatted(dateInput: any): string {
  const date = new Date(dateInput);
  let day: string = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  day = +day < 10 ? '0' + day : day;
  month = +month < 10 ? '0' + month : month;
  return `${date.getFullYear()}-${month}-${day}`;
}

