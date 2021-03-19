import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';

interface FormClass {
  class: string;
  korean: string;
  note?: string;
}
@Component({
  selector: 'sw-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss']
})

export class JoinPageComponent implements OnInit {

  joinForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    formBuilder: FormBuilder,
  ) {
    this.joinForm = formBuilder.group({
      no: [null],
      password: [null],
      confirmPassword: [null],
      info: formBuilder.group({
        name: [null],
        email: [null],
        phone: [null],
        department: [null],
      })
    });
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.joinForm.invalid) {
      return;
    }

    const user: User = this.joinForm.getRawValue();

    this.authService.join(user).subscribe(
      success => this.router.navigateByUrl('/account/login'),
      err => console.log(err)
    );
  }
}
