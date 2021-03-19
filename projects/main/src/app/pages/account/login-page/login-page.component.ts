import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'sw-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      no: [null],
      password: [null]
    });
  }

  submit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { no, password } = this.loginForm.getRawValue();

    this.authService.login(no, password).subscribe(
      success => this.router.navigateByUrl('/main'),
      err => console.error(err)
    );
  }

  ngOnInit(): void {
  }

}
