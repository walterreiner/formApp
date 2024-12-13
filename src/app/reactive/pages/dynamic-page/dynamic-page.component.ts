import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  standalone: false,

  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

    public dynamicForm: FormGroup;

    public newFavorite: FormControl = new FormControl('', Validators.required);

    constructor( private formBuilder: FormBuilder ){
      this.dynamicForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        favoriteGames: this.formBuilder.array([
          ['Metal Gear', Validators.required],
          ['Death Standing', Validators.required],
        ])
      })
    }

    get favoriteGames(){
      return this.dynamicForm.get('favoriteGames') as FormArray;
    }

    isValidField(field: string){
      return this.dynamicForm.controls[field].errors
      && this.dynamicForm.controls[field].touched;
    }

    isValidFieldInArray(formArray: FormArray, i: number){
      return formArray.controls[i].errors
      &&  formArray.controls[i].touched;
    }

    getFieldError(field: string): string | null {
      if(!this.dynamicForm.controls[field]) return null;

      const error = this.dynamicForm.controls[field].errors || {};;

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

    onAddFavorites():void{
      if ( this.newFavorite.invalid) return;
      const newFavorite = this.newFavorite.value;
      this.favoriteGames.push(
        this.formBuilder.control(newFavorite, Validators.required)
      );
      this.newFavorite.reset();
    }

    onDeleteFavorite(i: number):void{
      this.favoriteGames.removeAt(i);
    }

    onSubmit(): void{
      if( this.dynamicForm.valid ){
        this.dynamicForm.markAllAsTouched();
        return;
      }
      console.log(this.dynamicForm.value);
      this.favoriteGames.clear();
      this.dynamicForm.reset();
    }

}
