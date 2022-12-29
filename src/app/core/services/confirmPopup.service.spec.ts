/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConfirmPopupService } from './confirmPopup.service';

describe('Service: ConfirmPopup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmPopupService]
    });
  });

  it('should ...', inject([ConfirmPopupService], (service: ConfirmPopupService) => {
    expect(service).toBeTruthy();
  }));
});
