import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as localForage from 'localforage';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UsersService {


    constructor(private http: HttpClient) { }

    async get() {
        return this.http.get(`${environment.API_URL}api/users`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `bearer ${await localForage.getItem('token')}`
            }),
            withCredentials: true
        }).toPromise();
    }

    async getById(user_id: any) {
        return this.http.get(`${environment.API_URL}api/users/${user_id}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `bearer ${await localForage.getItem('token')}`
            }),
            withCredentials: true
        }).toPromise();
    }

    async create(data: any) {
        return this.http.post(`${environment.API_URL}api/users`, data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `bearer ${await localForage.getItem('token')}`
            }),
            withCredentials: true
        }).toPromise();
    }

    async update(data: any) {
        return this.http.put(`${environment.API_URL}api/users/${data._id}`, data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `bearer ${await localForage.getItem('token')}`
            }),
            withCredentials: true
        }).toPromise();
    }

    async delete(user_id: any) {
        return this.http.delete(`${environment.API_URL}api/users/${user_id}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `bearer ${await localForage.getItem('token')}`
            }),
            withCredentials: true
        }).toPromise();
    }
}
