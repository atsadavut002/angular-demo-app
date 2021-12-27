import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { FormUsersComponent } from './form-users/form-users.component';
import { AuthGuard } from './../auth.guard';

const routes: Routes = [
    { path: '', component: ListUsersComponent, canActivate: [AuthGuard] },
    { path: 'form', component: FormUsersComponent, canActivate: [AuthGuard] },
    { path: 'form/:user_id', component: FormUsersComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
