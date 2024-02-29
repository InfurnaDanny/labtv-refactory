import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/auth.service';
import { Login } from '../../../model/login.model';
import {User} from '../../../model/user';


@Component({
  selector: 'app-login-user',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent {

  @Output() isModaleVisible = new EventEmitter<boolean>()
  
  router = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  regExpPsw: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@£€$'!~,;:_^=?*+#.&§%°(){}|[/]{8,}$/;
  regExpEmail: RegExp = /^[\-\w\.]+@([\-\w]+\.)+[\-\w]{2,4}$/;
  
  loginForm = this.fb.nonNullable.group({
    loginEmail: ['', [Validators.required, Validators.email, Validators.pattern(this.regExpEmail)]],
    loginPassword: ['',[Validators.required, Validators.pattern(this.regExpPsw)]]
  })

  // FORM
  email = signal('');
  password = signal('');
  token = signal(''); 

  isErrorVisible = signal(false);
  errorMessage = signal('');

  login(form:FormGroup){
    const user: User = { // assegno le credenziali d'accesso
      email: form.value.loginEmail,
      password: form.value.loginPassword
    }
    
    this.authService.authorize(user).subscribe({
      next: (res: Login) => { 
        this.authService.userID.next(res.user.id);
        this.authService.isLoggegIn.next(true);
        this.authService.userName.next(res.user.username);
        this.authService.userToken.next(res.accessToken);

        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('idUser', res.user.id);
        localStorage.setItem('username', res.user.username);

        this.router.navigate(['/home']);
      },
      error:(err) => {
        this.isErrorVisible.set(true);
        this.errorMessage.set(`${err.error} | ${err.status} - ${err.statusText}`);

        setTimeout(() => {
          this.isErrorVisible.set(false);
          this.errorMessage.set('');
        }, 2000);
      }}
    )
  }

  modalVisible(value:boolean){ // passo il valore true o false in base alla modale che voglio mostrare
    this.isModaleVisible.emit(value)
  }
}
