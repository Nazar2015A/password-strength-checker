import { Injectable } from '@angular/core';
import { PasswordColors } from './models/password-colors';
import { ResultColor } from './models/result-color.model';

@Injectable({
  providedIn: 'root',
})
export class PasswordStrengthService {
  checkPasswordStrength(password: string): ResultColor {
    const result: ResultColor = {
      section1Color: PasswordColors.Gray,
      section2Color: PasswordColors.Gray,
      section3Color: PasswordColors.Gray,
    };

    if (!password || password.length === 0) {
    } else if (password.length <= 8) {
      this.setColorsForWeakPassword(result);
    } else {
      this.checkCharactersAndSetColors(password, result);
    }

    return result;
  }

  private setColorsForWeakPassword(result: ResultColor): void {
    result.section1Color = PasswordColors.Red;
    result.section2Color = PasswordColors.Red;
    result.section3Color = PasswordColors.Red;
  }

  private checkCharactersAndSetColors(
    password: string,
    result: ResultColor
  ): void {
    const hasDigits = /[0-9]/.test(password);
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasSpecialChars = /[!@#\$%\^\&*\)\(+=._-]/.test(password);

    if (hasDigits && hasLetters && hasSpecialChars) {
      result.section1Color = PasswordColors.Green;
      result.section2Color = PasswordColors.Green;
      result.section3Color = PasswordColors.Green;
    } else if (
      (hasDigits && hasLetters) ||
      (hasDigits && hasSpecialChars) ||
      (hasLetters && hasSpecialChars)
    ) {
      result.section1Color = PasswordColors.Yellow;
      result.section2Color = PasswordColors.Yellow;
      result.section3Color = PasswordColors.Gray;
    } else {
      result.section1Color = PasswordColors.Red;
      result.section2Color = PasswordColors.Gray;
      result.section3Color = PasswordColors.Gray;
    }
  }
}
