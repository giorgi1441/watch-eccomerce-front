import { Component, inject, Signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { authStore } from '../../../store/auth.store';

@Component({
  selector: 'app-login',
  imports: [ MatInputModule, ReactiveFormsModule, MatInput, MatCheckbox, MatButton, MatDialogContent, MatDialogTitle, MatIconModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _authStore= inject(authStore);
  readonly loginForm: FormGroup = this._formBuilder.group({
    email: [ null, [ Validators.required, Validators.email ] ],
    password: [ null, [ Validators.required ] ],
    remember: [ false ],
  })

  readonly loading: Signal<boolean> = this._authStore.loading;
  readonly error: Signal<string | null> = this._authStore.error;

  login() {
    this._authStore.loginIn({
      userName: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    })
  }
}
