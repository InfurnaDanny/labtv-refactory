import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { FormBuilder, AbstractControl, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../model/user';
import { AlertService } from '../../../shared/components/alert.service';
import { REGEX_EMAIL, REGEX_PASSWORD, REGEX_USERNAME } from '../../../costants';


@Component({
  selector: 'app-register',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  @Output() isModaleVisible = new EventEmitter<boolean>();

  fb = inject(FormBuilder); 
  authService = inject(AuthService);
  alertService = inject(AlertService);

  registerForm = this.fb.nonNullable.group({
    username: ['',[Validators.required, Validators.minLength(5), Validators.pattern(REGEX_USERNAME)]],
    email: ['',[Validators.required, Validators.email, Validators.pattern(REGEX_EMAIL)]],
    password: ['',[Validators.required, Validators.pattern(REGEX_PASSWORD)]],
    repeatPassword: ['', Validators.required],
    privacy: [false, Validators.required],
    },{ validators: [this.passwordsMatchValidator] }
  );

  register(){    
    const user: User = {
      username: this.registerForm.get('username')!.value,
      email: this.registerForm.get('email')!.value,
      password: this.registerForm.get('password')!.value,
    } 

    this.authService.registerAuthorize(user).subscribe({
      next: ()=>{ 
        this.alertService.showAlert('success', 'Registrazione effettuata con successo!');
      },
      error: err => {
        this.alertService.showAlert('error', `${err.error} | ${err.status} - ${err.statusText}`);
      }    
    })
  }

  modalVisible(value:boolean){ // passo il valore true o false in base alla modale che voglio mostrare
    this.isModaleVisible.emit(value)
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');

    if(password!.value !== '' && repeatPassword!.value !== ''){
      return password && repeatPassword && 
      password.value !== repeatPassword.value? { 'passwordsMismatch': true } : null;
    } else return null
  }
}