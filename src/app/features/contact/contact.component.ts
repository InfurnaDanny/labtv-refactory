import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../../shared/components/alert.service';
import { ContactFormComponent } from './contact-form/contact-form.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ContactFormComponent],
  template: `
    <div id="contact">
    <img src="./../../assets/footer.png" alt="logo-footer" />

    <div class="chi-siamo">
      <app-contact-form (sendEmail)="sendEmail()"></app-contact-form>
    </div>
  </div>
  `,
  styles: `
    #contact{
    display: flex;
    width: 100%;
    justify-content: center;

      img{
        margin: 20px 100px;
        max-height: 500px;
        align-self: center;
      }
    }

    .chi-siamo{
      max-width: 600px;
      align-self: center;
    }

    @media screen and (max-width: 1100px) {
        #contact{
            flex-direction: column;
        }
    }
  `
})
export class ContactComponent {

  router = inject(Router);
  alertService = inject(AlertService);

  sendEmail(){
    this.alertService.showAlert('success', 'Messaggio inviato con successo!')

    setTimeout(() => {
        this.router.navigate(['/home'])
    }, 2000); 
  }
}
