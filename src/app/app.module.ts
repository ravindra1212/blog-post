import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CoreModule } from './core/core.module';

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
import { SignupComponent } from './components/signup/signup.component';
import { FormErrorsComponent } from '@core/components/form-errors/form-errors.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { ErrorInterceptor } from './services/error-interceptor';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        HomeComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        ToastModule,
        ConfirmPopupModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxSpinnerModule.forRoot(),
        AppRoutingModule,
        NgxsModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(), 
        FormErrorsComponent // Standalone Component

        // NgxsReduxDevtoolsPluginModule.forRoot(),

    ],
    providers: [
        MessageService, 
        ConfirmationService,
        {
            provide :HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi:true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { 

    constructor(private injector: Injector) {
        ServiceLocator.injector = injector;
    }
 }
