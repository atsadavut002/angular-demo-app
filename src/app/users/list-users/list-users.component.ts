import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

    users: any = [];

    UserSelected: any = null;
    constructor(private service: UsersService ,private router:Router) { }

    ngOnInit() {
        this.getUsers()
    }

    async getUsers() {
        const users = await this.service.get();
        this.users = users;
    }

    addUser(){
        this.router.navigateByUrl(`users/form`);
    }

    editUser(user: any){
        this.router.navigateByUrl(`users/form/${user._id}`);
    }

    selectUser(user: any) {
        this.UserSelected = user;
    }

    async deleteUser() {
        await this.service.delete(this.UserSelected._id);
        this.users = this.users.filter((row:any) => row._id != this.UserSelected._id);
    }



}
