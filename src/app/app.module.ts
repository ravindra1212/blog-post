import { HttpClientModule } from '@angular/common/http';
import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { ServiceLocator } from '@core-services/service-locator.service';

@NgModule({
    declarations: [
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
        ConfirmPopupModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxSpinnerModule.forRoot(),
        AppRoutingModule,
        NgxsModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(),    
        // NgxsReduxDevtoolsPluginModule.forRoot(),

    ],
    providers: [MessageService, ConfirmationService],
    bootstrap: [AppComponent]
})
export class AppModule { 

    constructor(private injector: Injector) {
        ServiceLocator.injector = injector;
    }
 }
