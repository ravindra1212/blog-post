import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostsComponent } from './modules/posts/posts.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginPageAccessService } from './services/login-page-access.service';

const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full'
    },
    { 
        path : 'login',
        component : LoginComponent,
        canActivate: [LoginPageAccessService]
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'posts',
        component: PostsComponent,
        canActivate: [AuthGuardService]
    },
    {
        path : "**",
        component : PageNotFoundComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes)],
    declarations: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }
