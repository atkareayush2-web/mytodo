import { Routes } from '@angular/router';
import { LoginComponent } from './folder/login/login';
import { HomeComponent } from './folder/home/home';
import { UserListComponent } from './folder/user-list/user-list';
import { EditUserComponent } from './folder/edit-user/edit-user';
import { UserWelcomeComponent } from './folder/userwelcome/userwelcome';
import { CreateTaskComponent } from './folder/create-task/create-task';
import { TaskListComponent } from './folder/task-list/task-list';
import { TaskEditComponent } from './folder/task-edit/task-edit';
import { DashboardComponent } from './folder/dashboard/dashboard';  

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user-list',
    component: UserListComponent
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent
  },
  {
    path: 'welcome',
    component: UserWelcomeComponent
  },
  {
  path: 'create-task',
  component: CreateTaskComponent 
 },
 {
  path: 'task-list',
  component: TaskListComponent 
 },
 {
  path: 'edit-task/:id',
  component: TaskEditComponent
},
  { path: 'dashboard', 
    component: DashboardComponent 
  },
  
  {
    path: '**',
    redirectTo: 'login' // fallback route
  },
];
