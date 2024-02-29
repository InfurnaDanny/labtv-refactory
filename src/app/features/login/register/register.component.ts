import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {AuthService} from '../../../auth/auth.service';
import {User} from '../../../model/user';


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

  regExpPsw:RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@£€$'!~,;:_^=?*+#.&§%°(){}|[/]{8,}$/;
  regExpEmail:RegExp = /^[\-\w\.]+@([\-\w]+\.)+[\-\w]{2,4}$/;
  regExpUsername:RegExp = /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9_]+(?<![_.])$/

  isErrorVisible = signal(false);
  myMessage = signal('');
  typeMessage = signal(false);

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
        this.typeMessage.set(true);
        this.isErrorVisible.set(true);
        this.myMessage.set('Registrazione effettuata con successo');

        setTimeout(() => {
          this.modalVisible(true);
          this.isErrorVisible.set(false);
          this.myMessage.set('');
          this.typeMessage.set(false);
        }, 2000); 
      },
      error: err => {
        // gestisco l'errore in modo che si veda lo span e il tipo di errore
        this.isErrorVisible.set(true);
        this.myMessage.set(`${err.error} | ${err.status} - ${err.statusText}`);

        setTimeout(() => {
          this.isErrorVisible.set(false);
          this.myMessage.set('');
        }, 2000);
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