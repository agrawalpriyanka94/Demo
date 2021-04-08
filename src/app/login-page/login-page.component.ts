import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {Login} from '../login';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  LoginForm: FormGroup;
  formBuilder: any;
  postResponse: any;
  submitted = false;
  Message: any;
  accessToken: any;
  show: any;

  // constructor() { }
  constructor(public router: Router, private fb: FormBuilder, public api: ApiService) {

  }

  ngOnInit(): void {
    // console.log(this.api.getMovie());
    // this.api.getMovie();
    this.LoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get registerFormControl() {
    return this.LoginForm.controls;
  }

  onSubmit() :any{
    this.submitted = true;

    if (this.LoginForm.valid) {
      const opost = new Login();
      opost.username = this.LoginForm.value.username;
      opost.password = this.LoginForm.value.password;
      if (opost.username !== 'testuser' || opost.password !== 'ruDWLeHr9K7ErsUS') {
        this.Message = 'Login Failed! Invalid Username & Password';

        this.showMessageSoon();

      } else {
        this.api.loginPage(opost).subscribe(res => {
          console.log(res);
          this.accessToken = res.data.token;

          localStorage.setItem('accessToken', this.accessToken);

          console.log(this.accessToken);
          this.router.navigateByUrl('/Movie');

        });
      }

      // if(opost.username !=='testuser' && opost.password !=='ruDWLeHr9K7ErsUS')
      // {
      //   this.Message='This is an error!'
      // }


    }
  }

  showMessageSoon() {
    this.show = true;
    setTimeout(() => {

      this.show = false;
    }, 3000);
  }
}


