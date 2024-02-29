import {CommonModule} from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {RegisterComponent} from './register/register.component';
import {LoginUserComponent} from './login-user/login-user.component';

@Component({
  selector: 'app-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RegisterComponent, LoginUserComponent],
  template: `
    <section>
      @if(isModaleVisible()){
          <app-login-user (isModaleVisible)="isModalVisible($event)"></app-login-user>
      }@else{
          <app-register (isModaleVisible)="isModalVisible($event)"></app-register>
      }
    </section>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  isModaleVisible = signal(true) // all'apertura della pagina mostro la modale del login

  isModalVisible(value: boolean){ // dai componenti figli (login/user) dico se la modale è true o false
    this.isModaleVisible.set(value);
  }
}
