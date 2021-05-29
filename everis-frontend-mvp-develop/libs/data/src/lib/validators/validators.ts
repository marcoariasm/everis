import { AbstractControl, ValidatorFn, ValidationErrors, FormControl, Validators } from '@angular/forms';

export class AppValidators extends Validators {

  static onlyNumber = (control: AbstractControl): ValidationErrors | null => {
    const regex: RegExp = new RegExp(/^\d+$/);
    const value: string = control.value ? control.value : '';
    if (!regex.test(value)) {
      return {
        onlyNumber: true,
      };
    }

    return null;
  }

  static maxLengthDNI(typeDocumentControl: FormControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const typeDocument = typeDocumentControl.value;
      const value: string = control.value ? control.value : '';
      const regex: RegExp = new RegExp(/^\d+$/);
      if (typeDocument === '1' && value.length === 8 && regex.test(value)) {
        return null;
      } else if (typeDocument !== '1' && (value.length >= 4 && value.length <= 20)) {
        return null;
      }
      return {
        maxLengthDNI: true,
      };
    };
  }

  static email = (control: AbstractControl): ValidationErrors | null => {
    const regex: RegExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    const value: string = control.value ? control.value : '';
    if (!regex.test(value)) {
      return {
        onlyNumber: true,
      };
    }

    return null;
  }

  static birthDateMaxYear = (control: AbstractControl): ValidationErrors | null => {

    const currentDate = new Date();

    const [
      maxDay,
      maxMounth,
      maxYear
    ]
      =
   [
     currentDate.getDate()+1,
     currentDate.getMonth() ,
     currentDate.getFullYear() - 18
      ];

    if (control.value) {

      const inputDate = new Date(control.value);
      const maxDate = new Date(maxYear, maxMounth, maxDay);

      if (inputDate>=maxDate) {
        return {
          birthDateMaxYear: true,
        };
      }
    }

    return null;
  }


  static isNumber = (value: any): boolean => {
    return isNaN(parseInt(value, 10)) ? false : true;
  }

  static allLetters = (inputText: string): boolean => {
    const lettersRGEX = /^[A-Za-z]+$/;
    return lettersRGEX.test(inputText);
  }
}
