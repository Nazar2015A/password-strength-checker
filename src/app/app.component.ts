import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="checker-password">
      <app-password-strength></app-password-strength>
    </div>
  `,
  styleUrls: ['./app.component.css'],
  styles: [`
  .checker-password {
    margin-top: 200px;
    padding: 50px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background: #fff;
  }
  `]
})
export class AppComponent {
}
