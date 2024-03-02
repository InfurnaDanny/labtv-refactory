import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {AuthService} from '../../../auth/auth.service';
import {User} from '../../../model/user';
import {AlertService} from '../../../shared/components/alert.service';


@Component({
  selector: 'app-register',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  @Output() isModaleVisible = new EventEmitter<boolean>();
  fb = inject(FormBuilder); 
  authService = inject(AuthService);
  alertService = inject(AlertService);

  regExpPsw:RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@£€$'!~,;:_^=?*+#.&§%°(){}|[/]{8,}$/;
  regExpEmail:RegExp = /^[\-\w\.]+@([\-\w]+\.)+[\-\w]{2,4}$/;
  regExpUsername:RegExp = /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9_]+(?<![_.])$/;

  registerForm = this.fb.nonNullable.group({
    registerUsername: ['',[Validators.required, Validators.minLength(5), Validators.pattern(this.regExpUsername)]],
    registerEmail: ['',[Validators.required, Validators.email, Validators.pattern(this.regExpEmail)]],
    registerPassword: ['',[Validators.required, Validators.pattern(this.regExpPsw)]],
    repeatPassword: ['', Validators.required],
    privacy: [false, Validators.required],
    },{ validators: [this.passwordsMatchValidator] }
  );

  modalVisible(value:boolean){ // passo il valore true o false in base alla modale che voglio mostrare
    this.isModaleVisible.emit(value)
  }

  register(form:FormGroup){    
    const user:User = { // salvo i valori registrati
      username: form.value.registerUsername,
      email: form.value.registerEmail,
      password: form.value.registerPassword
    } 

    this.authService.registerAuthorize(user).subscribe({
      next: ()=>{ 
        this.alertService.showAlert('success', 'Registrazione effettuata con successo');
      },
      error: err => {
        this.alertService.showAlert('error', `${err.error} | ${err.status} - ${err.statusText}`);
      }    
    })
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('registerPassword');
    const repeatPassword = control.get('repeatPassword');

    if(password!.value !== '' && repeatPassword!.value !== ''){
      return password && repeatPassword && 
      password.value !== repeatPassword.value? { 'passwordsMismatch': true } : null;
    } else return null
  }
}