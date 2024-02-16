import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true
    }
  ]
})
export class PasswordInputComponent implements ControlValueAccessor {
  @Input() password: string = '';
  @Output() passwordChanged = new EventEmitter<string>();
  @Output() visibilityToggled = new EventEmitter<void>();
  showPassword: boolean = false;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  onInputChanged() {
    this.onChange(this.password);
    this.passwordChanged.emit(this.password);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.visibilityToggled.emit();
    this.onTouched();
  }

  writeValue(value: any): void {
    this.password = value;
  }
  
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
