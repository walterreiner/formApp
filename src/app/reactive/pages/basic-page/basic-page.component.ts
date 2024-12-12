import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { retry } from 'rxjs';

@Component({
  standalone: false,
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent {

  public mainForm: FormGroup;

  constructor( private formbuilder: FormBuilder ){
    this.mainForm =  this.formbuilder.group({
      name:['',[Validators.required, Validators.minLength(3)]],
      price:[0, [Validators.required, Validators.min(0)]],
      inStorage:[0, [Validators.required, Validators.min(0)]],
    })
  }

  isValidField(field: string){
    return this.mainForm.controls[field].errors
    && this.mainForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if(!this.mainForm.controls[field]) return null;

    const error = this.mainForm.controls[field].errors || {};;

    for ( const key of Object.keys(error) ){

      switch (key){
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${error['minlength'].requiredLenght} caracteres.`;
      }
    }

    return null
  }

  onSave():void {
    if (this.mainForm.invalid) {
      this.mainForm.markAllAsTouched();
      return;
    };

    console.log(this.mainForm.value);

    this.mainForm.reset({price :0, inStorage:0 });
  }

}
