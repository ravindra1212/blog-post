import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostsModule } from './modules/posts/posts.module';
import { FormErrorsComponent } from './cors/components/form-errors/form-errors.component';

@NgModule({
    declarations: [
        FormErrorsComponent,
        AppComponent,
        LoginComponent,
        HomeComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ToastModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        PostsModule
    ],
    providers: [MessageService],
    bootstrap: [AppComponent]
})
export class AppModule { }
