import {CommonModule} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  regExpName:RegExp = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  regExpTel:RegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  regExpEmail:RegExp = /^[\-\w\.]+@([\-\w]+\.)+[\-\w]{2,4}$/;

  constructor(
    private fb: FormBuilder, // form builder dei form reactive
    private route:Router
  ) { }
  
  contactForm!: FormGroup;

  isErrorVisible:boolean = false; // gestione span error/success
  myMessage:string = '';
  typeMessage:boolean = false;
  

  ngOnInit(): void {    
     // reactive form con validazione per il form di registrazione
     this.contactForm = this.fb.group({
      contactNome: new FormControl ('',[Validators.required, Validators.minLength(5), Validators.pattern(this.regExpName)]),
      contactEmail: new FormControl ('',[Validators.required, Validators.email, Validators.pattern(this.regExpEmail)]),
      contactTel: new FormControl ('',[Validators.required, Validators.pattern(this.regExpTel)]),
      contactMsg: new FormControl('',[Validators.required, Validators.minLength(20), Validators.maxLength(150)]),
      privacy: new FormControl (false, Validators.required),
    });
  }

  contact(){
    this.typeMessage = true;
    this.isErrorVisible = true;
    this.myMessage = 'Messaggio inviato con successo'

    setTimeout(() => {
        this.isErrorVisible = false;
        this.myMessage = '';
        this.typeMessage = false;
        this.route.navigate(['/home'])
    }, 2000); 
  }

}
