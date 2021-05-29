import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUbigeo } from '@aafp/commons/interfaces';
import {
  Bank,
  Department,
  District,
  Currency,
  Country,
  Province,
} from '../interfaces/ubigeo.interface';
import { SessionStorage } from '@ecnf/ng-microkernel/storage';

@Injectable({
  providedIn: 'root',
})
export class Ubigeo {
  private url = `${environment.url}/retiro4uitprod/v1/util4uit/util`;

  public departments: Department[] = [];
  public provinces: Province[] = [];
  public districts: District[] = [];
  public countries: Country[] = [];
  public currencies: Currency[] = [];
  public banks: Bank[] = [];

  constructor(private http: HttpClient, private storage: SessionStorage) {}

  getDepartments() {
    const url = environment.env !== ''
      ? this.url
      : 'http://localhost:3000/location/v2/ubigeo/departments';
    this.http.get(url, { headers: this.getHeaders() }).subscribe((resp: Department[]) => {
      this.departments = resp;
    });
  }

  getProvinces(code: string) {
    this.provinces = [];
    const url = environment.env !== ''
      ? `${this.url}?code=${code}`
      : 'http://localhost:3000/location/v2/ubigeo/provinces';
    this.http.get(url, { headers: this.getHeaders() }).subscribe((resp: Province[]) => {
      this.provinces = resp;
    });
  }

  getDistricts(code: string) {
    this.districts = [];
    const url = environment.env !== ''
      ? `${this.url}?code=${code}`
      : 'http://localhost:3000/location/v2/ubigeo/districts';
    this.http.get(url, { headers: this.getHeaders() }).subscribe((resp: District[]) => {
      this.districts = resp;
    });
  }

  getCountries() {
    const url = environment.env !== ''
      ? `${this.url}/countries.json`
      : 'http://localhost:3000/location/v2/ubigeo/countries';
    this.http.get(url, { headers: this.getHeaders() }).subscribe((resp: Country[]) => {
      this.countries = resp;
    });
  }

  getCurrencies() {
    const url = environment.env !== ''
      ? `${this.url}/currencies.json`
      : 'http://localhost:3000/location/v2/ubigeo/currencies';
    this.http.get(url, { headers: this.getHeaders() }).subscribe((resp: Currency[]) => {
      this.currencies = resp;
    });
  }

  getBanks() {
    const availableBanks = [
      'BBVA',
      'BCP',
      'IBK',
      'SCOTIA',
      'BANBIF',
      'BN',
      'BANCODECOMERCIO',
      'GNB',
      'CAJAHUANCAYO',
      'CAJASULLANA',
      'RIPLEY',
    ];
    const url = environment.env !== ''
      ? `${this.url}/banks.json`
      : 'http://localhost:3000/location/v2/ubigeo/banks';
    this.http.get(url, { headers: this.getHeaders() }).subscribe((resp: Bank[]) => {
      const unorderedBanks = resp.filter(bank => availableBanks.indexOf(bank.code) !== -1);
      this.banks = this.orderBanksByname(unorderedBanks);
    });
  }

  get(data: any, signature: string) {
    return this.http.get<IUbigeo[]>(this.url, {
      observe: 'body',
      headers: {
        'x-afp-signature': signature,
        'Ocp-Apim-Subscription-Key': environment.apiSubscriptionKey,
      },
      params: data,
    });
  }

  private orderBanksByname(arr: any) {
    return arr.sort((a, z) => {
      if (a.description < z.description) {
        return -1;
      }
      if (a.description > z.description) {
        return  1;
      }
      return 0;
    });
  }

  private getHeaders() {
    const signature = this.storage.get('signature');
    return  new HttpHeaders({
      'x-afp-signature': signature,
      'Ocp-Apim-Subscription-Key': environment.apiSubscriptionKey,
    });
  }
}
