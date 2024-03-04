import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { REGEX_NAME, REGEX_EMAIL, REGEX_TEL } from '../../../costants';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {

  @Output() sendEmail = new EventEmitter()
  
  fb = inject(FormBuilder);

  contactForm = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(5), Validators.pattern(REGEX_NAME)]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(REGEX_EMAIL)]],
    tel: ['', [Validators.required, Validators.pattern(REGEX_TEL)]],
    msg: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(150)]],
    privacy: [false, Validators.requiredTrue],
  });
}
