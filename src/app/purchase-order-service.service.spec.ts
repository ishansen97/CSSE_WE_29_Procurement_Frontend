import { TestBed } from '@angular/core/testing';

import { PurchaseOrderServiceService } from './purchase-order-service.service';

describe('PurchaseOrderServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PurchaseOrderServiceService = TestBed.get(PurchaseOrderServiceService);
    expect(service).toBeTruthy();
  });
});
