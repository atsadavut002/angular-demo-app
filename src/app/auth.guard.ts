import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as localForage from 'localforage';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        try {
            const token: any = await localForage.getItem('token');

            if (token) {
                return true;
            } else {
                this.router.navigateByUrl('/login');
                return false;
            }

        } catch (error) {
            this.router.navigateByUrl('/login');
            return false;
        }
    }

}
