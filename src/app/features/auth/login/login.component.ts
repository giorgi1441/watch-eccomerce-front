import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [ MatInputModule, ReactiveFormsModule, MatInput, MatCheckbox, MatButton ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  readonly loginForm: FormGroup = this._formBuilder.group({
    email: [ null, [ Validators.required, Validators.email ] ],
    password: [ null, [ Validators.required ] ],
    remember: [ false ],
  })
}
