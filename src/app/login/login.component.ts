import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import * as localForage from 'localforage';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginInfo: any = {
        user_email: null,
        user_password: null
    }
    constructor(
        private router: Router,
        private service: LoginService
    ) { }

    ngOnInit() {
        this.checklogin();
    }

    async login() {
        const response: any = await this.service.login(this.loginInfo).then((response) => { return response }).catch((error) => { return false });
        if (response) {
            await localForage.setItem('token', response.token);
            await localForage.setItem('user-info', response.user);
            window.location.href = '/';
        }
    }

    async checklogin() {
        const token: any = await localForage.getItem('token');
        console.log(token)
        if (token) {
            window.location.href = '/';
        }
    }

}
