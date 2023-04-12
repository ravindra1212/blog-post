import { Component, OnInit, OnDestroy, AfterViewInit  } from '@angular/core';
import { 
    AuthService, 
    NotifyService, 
    ServiceLocator, 
    ConfirmPopupService,
    HttpService
} from '@core/services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  template: ''
})
export abstract class BaseComponent  {

    /**
    * This injected services can use across all derived components
    */
    protected baseHttpService: HttpService;
    protected baseNotifyService: NotifyService;
    protected baseConfirmPopupService: ConfirmPopupService;
    protected baseAuthService: AuthService;
    protected baseRouter: Router;
    protected baseActivatedRoute : ActivatedRoute

    constructor() {
        this.baseHttpService = ServiceLocator.injector.get(HttpService);
        this.baseNotifyService = ServiceLocator.injector.get(NotifyService);
        this.baseConfirmPopupService = ServiceLocator.injector.get(ConfirmPopupService);
        this.baseAuthService = ServiceLocator.injector.get(AuthService);
        this.baseRouter = ServiceLocator.injector.get(Router);
        this.baseActivatedRoute = ServiceLocator.injector.get(ActivatedRoute);
    }


}
