import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  regExpName:RegExp = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  regExpTel:RegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  regExpEmail:RegExp = /^[\-\w\.]+@([\-\w]+\.)+[\-\w]{2,4}$/;

  contactForm = this.fb.nonNullable.group({
    contactNome: ['',[Validators.required, Validators.minLength(5), Validators.pattern(this.regExpName)]],
    contactEmail: ['',[Validators.required, Validators.email, Validators.pattern(this.regExpEmail)]],
    contactTel: ['',[Validators.required, Validators.pattern(this.regExpTel)]],
    contactMsg: ['',[Validators.required, Validators.minLength(20), Validators.maxLength(150)]],
    privacy: [false, Validators.required],
  });

  isErrorVisible = signal(false); 
  myMessage = signal('');
  typeMessage = signal(false);

  contact(){
    this.typeMessage.set(true);
    this.isErrorVisible.set(true);
    this.myMessage.set('Messaggio inviato con successo');

    setTimeout(() => {
        this.isErrorVisible.set(false);
        this.myMessage.set('');
        this.typeMessage.set(false);

        this.router.navigate(['/home'])
    }, 2000); 
  }

}
