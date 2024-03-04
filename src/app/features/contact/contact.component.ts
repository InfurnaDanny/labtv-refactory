import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from '../../shared/components/alert.service';
import {REGEX_EMAIL, REGEX_NAME, REGEX_TEL} from '../../costants';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  fb = inject(FormBuilder);
  router = inject(Router);
  alertService = inject(AlertService);

  contactForm = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(5), Validators.pattern(REGEX_NAME)]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(REGEX_EMAIL)]],
    tel: ['', [Validators.required, Validators.pattern(REGEX_TEL)]],
    msg: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(150)]],
    privacy: [false, Validators.requiredTrue],
  });

  sendEmail(){
    this.alertService.showAlert('success', 'Messaggio inviato con successo!')

    setTimeout(() => {
        this.router.navigate(['/home'])
    }, 2000); 
  }
}
