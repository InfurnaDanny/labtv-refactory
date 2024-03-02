import { ChangeDetectionStrategy, Component, Input, computed, inject, signal } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {AlertService} from './alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgTemplateOutlet],
  template: `
    @if(isAlertVisible()){
      <div class="alert" [ngClass]="{ 
          'alert-success' : typeOfAlert() === 'success',
          'alert-info' : typeOfAlert() === 'info',
          'alert-error' : typeOfAlert() === 'error',
      }">
        {{ msg() }}
      </div>
    }
  `,
  styles: `
    .alert{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 400px
      position: absolute;
      top: 20px;
      right: 20px;
      color: white;
      z-index: 4;
    }

    .alert-success{ background-color: #6ad15e }
    .alert-info{ background-color: #ad954b; color: black }
    .alert-error{ background-color: #a13333 }
  `
})
export class AlertComponent {
  alertService = inject(AlertService);
  
  msg = computed(()=>{ return this.alertService.msg() !== '' ? this.alertService.msg() : 'Errore'});
  isAlertVisible = computed(()=> { return this.alertService.isAlertVisible()});
  typeOfAlert = computed(()=> { return this.alertService.typeOfAlert()});
}
