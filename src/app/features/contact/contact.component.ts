import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from '../../shared/components/alert.service';

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

  regExpName:RegExp = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  regExpTel:RegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  regExpEmail:RegExp = /^[\-\w\.]+@([\-\w]+\.)+[\-\w]{2,4}$/;

  contactForm = this.fb.nonNullable.group({
    contactNome: ['', [Validators.required, Validators.minLength(5), Validators.pattern(this.regExpName)]],
    contactEmail: ['', [Validators.required, Validators.email, Validators.pattern(this.regExpEmail)]],
    contactTel: ['', [Validators.required, Validators.pattern(this.regExpTel)]],
    contactMsg: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(150)]],
    privacy: [false, Validators.requiredTrue],
  });

  sendEmail(){
    this.alertService.showAlert('success', 'Messaggio inviato con successo!')

    setTimeout(() => {
        this.router.navigate(['/home'])
    }, 2000); 
  }
}
