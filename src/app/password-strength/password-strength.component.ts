import { Component } from '@angular/core';
import { PasswordStrengthService } from './password-strength.service';
import { PasswordColors } from './models/password-colors';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css'],
})
export class PasswordStrengthComponent {
  password: string = '';
  section1Color: string = PasswordColors.Gray;
  section2Color: string = PasswordColors.Gray;
  section3Color: string = PasswordColors.Gray;
  showPassword: boolean = false;
  hintText: string = 'Your password should contain at least 8 characters!';

  constructor(private passwordStrengthService: PasswordStrengthService) {}

  onPasswordChanged(newPassword: string) {
    this.password = newPassword;
    this.checkPasswordStrength();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  checkPasswordStrength() {
    const result = this.passwordStrengthService.checkPasswordStrength(this.password);
    this.section1Color = result.section1Color;
    this.section2Color = result.section2Color;
    this.section3Color = result.section3Color;
  }
}
