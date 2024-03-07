import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  typeOfAlert = signal<TypeOfAlert>('error');
  msg = signal('Errore');
  isAlertVisible = signal(false);

  showAlert(type: TypeOfAlert, msg: string, timer?: number){
    this.msg.set(msg);
    this.typeOfAlert.set(type);
    this.isAlertVisible.set(true);

    setTimeout(() => {
      this.isAlertVisible.set(false)
    }, timer ? timer : 2500);
  }
}

type TypeOfAlert = 'success' | 'info' | 'error';