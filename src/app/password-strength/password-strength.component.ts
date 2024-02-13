import { Component } from '@angular/core';
enum PasswordColors {
  Gray = '#808080',
  Red = '#ff3535', 
  Yellow = '#f8f825', 
  Green = '#069506', 
}

@Component({
  selector: 'app-password-strength',
  template: `
    <div class="password-container">
    <div class="password-hint">

    <h2>Password Strength Checker</h2>
    <div class="hint-container">
        <button
          class="hint-icon"
          mat-icon-button
          matSuffix
          matTooltip="{{ hintText }}"
        >
          <mat-icon>help</mat-icon>
        </button>
      </div>
    </div>
      <mat-form-field appearance="fill">
        <mat-label>Password</mat-label>
        <input
          matInput
          [type]="showPassword ? 'text' : 'password'"
          [(ngModel)]="password"
          (input)="checkPasswordStrength()"
        />
        <button
          class="show-pass-icon"
          mat-icon-button
          matSuffix
          (click)="togglePasswordVisibility()"
        >
          <mat-icon>{{
            showPassword ? 'visibility_off' : 'visibility'
          }}</mat-icon>
        </button>
      </mat-form-field>

      <div class="strength-indicator" [ngStyle]="{ color: passwordColor }">
        <div
          class="strength-bar"
          [ngStyle]="{ 'background-color': section1Color }"
        ></div>
        <div
          class="strength-bar"
          [ngStyle]="{ 'background-color': section2Color }"
        ></div>
        <div
          class="strength-bar"
          [ngStyle]="{ 'background-color': section3Color }"
        ></div>
      </div>
    </div>
  `,
  styles: [
    `
      .password-container {
        margin-bottom: 20px;
      }

      .password-hint {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
      }

      .hint-container {
        display: flex;
        align-items: center;
      }

      .hint-icon {
        cursor: pointer;
        background: transparent;
      }

      .hint-text {
        font-size: 14px;
        color: #777;
      }

      mat-form-field {
        width: 100%;
      }

      mat-label {
        display: block;
      }

      .show-pass-icon {
        cursor: pointer;
        background: transparent;
        padding-right: 10px;
      }

      mat-input {
        padding: 8px;
        margin-bottom: 10px;
        box-sizing: border-box;
      }

      .mat-input-element {
        height: 20px;
      }

      .strength-indicator {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 10px;
      }

      .strength-bar {
        height: 10px;
        width: calc(100% / 3);
        transition: background-color 0.3s ease;
        border-radius: 3px;
      }

    `,
  ],
})
export class PasswordStrengthComponent {
  password: string = '';
  passwordColor: string = PasswordColors.Gray;
  section1Color: string = PasswordColors.Gray;
  section2Color: string = PasswordColors.Gray;
  section3Color: string = PasswordColors.Gray;
  showPassword: boolean = false;
  hintText: string = 'Your password should contain at least 8 characters!';

  checkPasswordStrength() {
    if (!this.password || this.password.length === 0) {
      this.passwordColor = PasswordColors.Gray;
      this.section1Color = PasswordColors.Gray;
      this.section2Color = PasswordColors.Gray;
      this.section3Color = PasswordColors.Gray;
    } else if (this.password.length !== 0 && this.password.length <= 8) {
      this.passwordColor = PasswordColors.Red;
      this.section1Color = PasswordColors.Red;
      this.section2Color = PasswordColors.Red;
      this.section3Color = PasswordColors.Red;
    } else {
      const hasDigits = /[0-9]/.test(this.password);
      const hasLetters = /[a-zA-Z]/.test(this.password);
      const hasSpecialChars = /[!@#\$%\^\&*\)\(+=._-]/.test(this.password);

      if (hasDigits && hasLetters && hasSpecialChars) {
        this.passwordColor = PasswordColors.Green;
        this.section1Color = PasswordColors.Green;
        this.section2Color = PasswordColors.Green;
        this.section3Color = PasswordColors.Green;
      } else if (
        (hasDigits && hasLetters) ||
        (hasDigits && hasSpecialChars) ||
        (hasLetters && hasSpecialChars)
      ) {
        this.passwordColor = PasswordColors.Yellow;
        this.section1Color = PasswordColors.Yellow;
        this.section2Color = PasswordColors.Yellow;
        this.section3Color = PasswordColors.Gray;
      } else {
        this.passwordColor = PasswordColors.Red;
        this.section1Color = PasswordColors.Red;
        this.section2Color = PasswordColors.Gray;
        this.section3Color = PasswordColors.Gray;
      }
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
