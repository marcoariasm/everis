import { Injectable } from '@angular/core';
import es from '@aafp/i18n/es.json';


@Injectable({ providedIn: 'root' })
export class I18n {
  private data: any;

  constructor() {
    this.data = es;
  }

  getLang(...params: string[]): object {
    const temp: object = {};

    params.forEach((param: string) => {
      let key: object = {};

      param.split('.').forEach(item => {
        key = this.data[item];

        if (key) {
          temp[item] = key;
        }
      });
    });

    return (params.length && temp) ? temp : this.data;
  }
}
