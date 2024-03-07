import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertService} from './alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    @if(alertService.isAlertVisible()){
      <div class="alert" [ngClass]="{ 
          'alert-success' : alertService.typeOfAlert() === 'success',
          'alert-info' : alertService.typeOfAlert() === 'info',
          'alert-error' : alertService.typeOfAlert() === 'error',
      }">
        <p> 
          <svg
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            class="stroke-current shrink-0 w-6 h-6"
          >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    [attr.d]="icons[alertService.typeOfAlert() || 'info']">
              </path>
          </svg>
          {{ alertService.msg() }}
        </p>
      </div>
    }
  `,
  styles: `
    .alert{
      display: flex;
      width: 400px;
      padding: 10px;
      border-radius: 5px;
      position: absolute;
      top: 20px;
      right: 20px;
      color: white;
      z-index: 4;

      p{
        display: flex;
        gap: 5px;

        svg{
          width: 1.5rem;
          flex-shrink: 0;

          path{
            stroke: currentColor;
          }
        }
      }
    }

    .alert-success{ background-color: #6ad15e }
    .alert-info{ background-color: #ad954b; color: black }
    .alert-error{ background-color: #a13333 }
  `
})
export class AlertComponent {
  alertService = inject(AlertService);
  
  icons = {
    info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  }
}
