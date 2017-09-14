import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <form #formRef="ngF orm" (ngSubmit)="onSubmit(formRef.value)">
        <fieldset ngModuleGroup="login">
          <input name="username"
                 type="text"
                 [(ngModel)]="username"
                 #usernameRef="ngModel"
                 minlength="3"
                 required
          />
          <div *ngIf="usernameRef.errors?.required">this is required</div>
          <div *ngIf="usernameRef.errors?.minlength">should be least 3</div>
          <input name="password"
                 type="password"
                 [(ngModel)]="password"
                 #passwordRef="ngModel"
                 required
          />
          <div *ngIf="passwordRef.errors?.required">this is required</div>
          <button type="submit">Login</button>
        </fieldset>
      </form>
    </div>
  `,
  styles: [`
    input.ng-invalid {
      border: 1px solid red;
    }
    input.ng-valid {
      border: 1px solid green;
      
    }
  `]
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  constructor(@Inject('auth') private service) { }

  onSubmit(formValue) {
    console.log('result is' + this.service.loginWithCredentials(formValue.login.username, formValue.login.password));
  }

  ngOnInit() {
  }

}
