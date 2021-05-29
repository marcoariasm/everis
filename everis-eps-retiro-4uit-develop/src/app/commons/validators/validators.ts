import { AbstractControl, ValidatorFn, ValidationErrors, FormControl, Validators, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

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
      if (typeDocument === 'DNI' && value.length === 8 && regex.test(value)) {
        return null;
      } else if (typeDocument !== 'DNI' && (value.length >= 4 && value.length <= 20)) {
        return null;
      }
      return {
        maxLengthDNI: true,
      };
    };
  }

  static accoounNumber(bankControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const bankName = bankControl.value;
      const value: string = control.value ? control.value : '';
      if (bankName === 'BCP' && (value.length === 13 || value.length === 14)) {
        return null;
      } else if ((bankName === 'BBVA' || bankName === 'CAJAHUANCAYO') && (value.length === 18)) {
        return null;
      } else if ((bankName === 'SCOTIA' || bankName === 'BN' || bankName === 'BANBIF') && value.length === 10) {
        return null;
      } else if (bankName === 'IBK' && value.length === 13) {
        return null;
      } else if ((bankName === 'BANCODECOMERCIO' || bankName === 'PICHINCHA' || bankName === 'GNB') && value.length === 12) {
        return null;
      } else if (bankName === 'CAJASULLANA' && value.length === 20) {
        return null;
      } else if (bankName === 'RIPLEY' && (value.length === 10 || value.length === 11)) {
        return null;
      }
      return {
        accountNumberFormat: true,
      };
    };
  }

  static amountBalance(balance: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isNaN(control.value)) {
        return null;
      }
      const value: number = control.value ? parseFloat(control.value) : 0;
      if (value <= balance) {
        return null;
      }
      return {
        amountBalance: true,
      };
    };
  }

  static amountBalanceAsync(balanceControl: AbstractControl) {

    return (control: AbstractControl) => {

      return of(control.value)
        .pipe(
          map((amount) => {

            if (!amount || isNaN(amount)) {
              return {
                onlyNumber: true,
              };
            }

            const balanceAmount: number = balanceControl.value ? parseFloat(balanceControl.value) : 0;
            const value: number = amount ? parseFloat(amount) : 0;
            if (value <= balanceAmount) {
              return null;
            }

            return {
              amountBalance: true,
            };
          })
        )
    }
  }

  /**
   * Valid when selecting the national bank and the account number begins with the digit 4
   * @param bankControl control
   * @returns ValidatorFn
   */
  static isBN(bankControl: FormControl): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      const bank = bankControl.value;
      const value: string = control.value ? control.value : '';

      if (bank === 'BN' && !value.startsWith('4')) {
        return {
          startsWithDigit4: true
        };
      } else {
        return null;
      }
    };
  }

  static email = (control: AbstractControl): ValidationErrors | null => {
    const regex: RegExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    const value: string = control.value ? control.value : '';
    if (value && !regex.test(value)) {
      return {
        onlyNumber: true,
      };
    }

    return null;
  }

  static birthDateMaxYear = (control: AbstractControl): ValidationErrors | null => {
    if (control.value) {
      const year = new Date(control.value).getFullYear();
      if (year >= 2003) {
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

  static maxAmount = (control: AbstractControl): ValidationErrors | null => {
    const { value, root = { value: {} } } = control;
    const { amountAvailable } = root.value;
    const maxAmountToWithdraw = environment.config.amountMax;
    const amountUIT = environment.config.amountUIT;

    if (value) {
      const parseValue = parseFloat(value);

      if (
        parseValue > parseFloat(amountAvailable) ||
        parseValue > maxAmountToWithdraw ||
        !amountAvailable
      ) {

        return {
          maxAmount: true
        };
      } else if (parseValue < amountUIT) {

        return {
          minUIT: true
        };
      }
    }

    return null;
  }

  static alphaWithSpace = (control: AbstractControl): ValidationErrors | null => {
    const lettersRGEX = /^[a-zA-Z\s]+$/;
    if (control.value) {
      if (!lettersRGEX.test(control.value)) {
        return {
          alphaWithSpace: true,
        };
      }
    }

    return null;
  }
  static alphaNumeric = (control: AbstractControl): ValidationErrors | null => {
    const lettersRGEX = /^[0-9a-zA-Z]+$/;
    if (control.value) {
      if (!lettersRGEX.test(control.value)) {
        return {
          alphaNumeric: true,
        };
      }
    }

    return null;
  }

  static alphaNumericWithSpace = (control: AbstractControl): ValidationErrors | null => {
    const lettersRGEX = /^[0-9a-zA-Z\s]+$/;
    if (control.value) {
      if (!lettersRGEX.test(control.value)) {
        return {
          alphaNumericWithSpace: true,
        };
      }
    }

    return null;
  }

}
