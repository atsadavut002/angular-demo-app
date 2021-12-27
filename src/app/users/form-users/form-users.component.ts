import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-form-users',
    templateUrl: './form-users.component.html',
    styleUrls: ['./form-users.component.css']
})
export class FormUsersComponent implements OnInit {

    userId: any;
    user: any = {
        _id: null,
        user_email: null,
        user_password: null,
        user_created: null,
    };
    newPassword: any = {
        confirm_password: null,
        new_password: null
    }

    canEdit: any = false;

    constructor(private service: UsersService, private activatedRoute: ActivatedRoute, private router: Router) { }

    async ngOnInit() {
        this.userId = await this.activatedRoute.snapshot.paramMap.get("user_id");
        if (this.userId) {
            this.canEdit = true;
            this.getUserById();
        }
    }

    async getUserById() {
        this.user = await this.service.getById(this.userId);
    }

    updatePassword() {
        if (this.newPassword.new_password == this.newPassword.confirm_password) {
            this.user.user_password = this.newPassword.new_password;
            this.service.update(this.user).then((data: any) => {
                alert('Update Passwords success');
                return this.router.navigateByUrl(`users/form/${data._id}`);
            }).catch((error: any) => {
                console.log(error);
                alert('Error Update');
                return null;
            });;
        } else {
            alert('Passwords do not match');
        }
    }

    async create() {
        if (this.newPassword.new_password == this.newPassword.confirm_password) {
            this.user.user_password = this.newPassword.new_password;
            const newUser = await this.service.create(this.user).then((data: any) => {
                alert('Create User success');
                return this.router.navigateByUrl(`users/form/${data._id}`);
            }).catch((error: any) => {
                console.log(error);
                alert('User duplicate');
                return null;
            });
        } else {
            alert('Passwords do not match');
        }
    }




}
