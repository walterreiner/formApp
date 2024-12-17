import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
// import * as customValidators from '../../../shared/validators/validator';
import { ValidatorService } from '../../../shared/service/validators.service';


@Component({
  selector: 'app-register-page',
  standalone: false,

  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService

  ) {
    this.registerForm = this.formBuilder.group({
      nombre:['',[Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern)]],
      correo:['',[Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
      usuario: ['',[Validators.required, this.validatorService.cantBeStider]],
      contrasena: ['',[Validators.required, Validators.minLength(6)]],
      contrasena2: ['',[Validators.required]],
    });
  }

  isValidField(field: string){
    return this.validatorService.isValidField(this.registerForm, field);
  }


  onSubmit(){
    this.registerForm.markAllAsTouched();
  }



}
