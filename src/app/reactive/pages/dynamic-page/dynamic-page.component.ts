import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

public myDinamicForm: FormGroup = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(3)]],
  favoriteGames: this.fb.array([
    ['Metal Gear', Validators.required],
    ['Pro Evolution', Validators.required],
  ])

});

public newFavorite: FormControl = new FormControl('', Validators.required)

constructor(private fb: FormBuilder){}

get favoriteGames(){
  return this.myDinamicForm.get('favoriteGames') as FormArray;
}


getFieldError(field: string): string | null {
  if ( !this.myDinamicForm.controls[field] ) return null

  const errors = this.myDinamicForm.controls[field].errors || {};

  for (const key of Object.keys(errors)) {
    switch(key){
      case 'required':
        return 'Este campo es requerido'

      case 'minlength':
        return `Mínimo ${ errors['minlength'].requiredLength } carácteres `
    }
  }

  return 'ha petado';
}

isValidField(field: string): boolean | null {
  return this.myDinamicForm.controls[field].errors
  && this.myDinamicForm.controls[field].touched
}

isValidFieldInArr(formArray: FormArray, index: number){
  return formArray.controls[index].errors
  && formArray.controls[index].touched

}

onAddToFavorites(): void{
  if ( this.newFavorite.invalid )return;

  const newFavorite = this.newFavorite.value
  this.favoriteGames.push(
    this.fb.control( newFavorite, Validators.required )
  );

  this.newFavorite.reset();

}

onDeleteFavorite(index: number): void{
  this.favoriteGames.removeAt(index);
}

onSubmit(): void {
  if (this.myDinamicForm.invalid){
    this.myDinamicForm.markAsTouched();
    return
  }
  (this.myDinamicForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
  this.myDinamicForm.reset();
}

}
