import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root'})
export class ValidatorService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStider = (control: FormControl): ValidationErrors | null => {

    const valor: string = control.value.trim().toLowerCase();

    if (valor === "strider") {
      return {
        noSrider : true,
      }
    }

    return null;

  }

  public isValidField(form: FormGroup , fields: string  ){
    return form.controls[fields].errors && form.controls[fields].touched;
  }

}
