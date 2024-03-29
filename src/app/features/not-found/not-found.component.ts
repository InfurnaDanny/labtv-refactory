import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div>
      <img src="./../../assets/404.png" alt="404 - Page not found" title="404 - Page not found">
    </div>
  `,
  styles: `
    div{
      display: flex;
      justify-content: center;
      padding: 20px;
    }
  `
})
export class NotFoundComponent {
}
