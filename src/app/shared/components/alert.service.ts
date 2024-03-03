import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  typeOfAlert = signal<'success' | 'info' | 'error'>('error');
  msg = signal('');
  isAlertVisible = signal(false);

  showAlert(type: 'success' | 'info' | 'error', msg: string){
    this.msg.set(msg);
    this.typeOfAlert.set(type);
    this.isAlertVisible.set(true);

    setTimeout(() => {
      this.isAlertVisible.set(false)
    }, 2500);
  }
}