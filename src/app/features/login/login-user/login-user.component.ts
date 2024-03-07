import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../auth/auth.service';
import { AlertService } from '../../../shared/components/alert.service';
import { UserService } from '../../../shared/services/user.service';
import { Login } from '../../../model/login.model';
import { User } from '../../../model/user';
import {REGEX_EMAIL, REGEX_PASSWORD} from '../../../costants';

@Component({
  selector: 'app-login-user',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgOptimizedImage],
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent {
  @Output() isModaleVisible = new EventEmitter<boolean>()
  
  router = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  userService = inject(UserService);
  alertService = inject(AlertService);
  
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern(REGEX_EMAIL)]],
    password: ['', [Validators.required, Validators.pattern(REGEX_PASSWORD)]]
  })

  login(){ 
     this.authService.login(this.loginForm.value as User).subscribe({
      next: (res: Login) => { 
        this.alertService.showAlert('success', 'Accesso effettuato con successo!');
        this.userService.saveUserData(res);
        this.router.navigate(['/home']);
      },
      error:(err) => {
        this.alertService.showAlert('error', `${err.error} | ${err.status} - ${err.statusText}`);
      }}
    )
  }

  modalVisible(value:boolean){ // passo il valore true o false in base alla modale che voglio mostrare
    this.isModaleVisible.emit(value)
  }
}
