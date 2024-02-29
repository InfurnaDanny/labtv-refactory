import { Routes } from '@angular/router';
import {AUTHGUARD} from './auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch:'full' },
    {
      path:'home',
      loadComponent: ()=>import('./features/home/home.component').then(m=>m.HomeComponent)
    },
    {
      path:'film', 
      loadComponent: ()=> import('./features/film/film.component').then(m => m.FilmComponent)
    },
    {
      path:'contact',
      loadComponent: ()=>import('./features/contact/contact.component').then(m=>m.ContactComponent)
    },
    {
      path:'login',
      loadComponent: ()=>import('./features/login/login.component').then(m=>m.LoginComponent)
    },
    {
      path:'film_aquistati', 
      loadComponent: ()=> import('./features/film-acquistati/film-acquistati.component').then(m=>m.FilmAcquistatiComponent), 
      canActivate: [AUTHGUARD]
    },
    {
      path:'**', 
      loadComponent: ()=>import('./features/not-found/not-found.component').then(m=>m.NotFoundComponent)
    }
  ];
