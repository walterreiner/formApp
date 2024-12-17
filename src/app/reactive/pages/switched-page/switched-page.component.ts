import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/service/validators.service';

@Component({
  standalone: false,
  templateUrl: './switched-page.component.html',
  styles: ``
})
export class SwitchedPageComponent {

    public switchForm: FormGroup;

    constructor ( private formBuilder: FormBuilder,
      private validatorService: ValidatorService
     ) {

      this.switchForm = this.formBuilder.group({
        gender: ['M', Validators.required],
        notifications: [true, Validators.required],
        terms: [false, Validators.requiredTrue],
      })

      // Suscribirse a los cambios de valor
      this.switchForm.get('gender')?.valueChanges.subscribe(value => {
        console.log('El género seleccionado cambió a:', value);
        // Aquí puedes ejecutar cualquier lógica personalizada
      });
    }

    onGenderChange(event: Event): void {
      const value = (event.target as HTMLInputElement).value;
      console.log('Cambio detectado, nuevo valor:', value);
    }

    onSave(): void {
      if (this.switchForm.invalid) {
        this.switchForm.markAllAsTouched();
        return
      };
    }

    isValidField(field: string){
      return this.validatorService.isValidField(this.switchForm, field);
    }

    onSubmit(): void{
      if( this.switchForm.valid ){
        this.switchForm.markAllAsTouched();
        return;
      }
      console.log(this.switchForm.value);
      //this.favoriteGames.clear();
      //this.dynamicForm.reset();
    }
}
