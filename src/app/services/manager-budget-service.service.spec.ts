import { TestBed } from '@angular/core/testing';

import { ManagerBudgetServiceService } from './manager-budget-service.service';

describe('ManagerBudgetServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagerBudgetServiceService = TestBed.get(ManagerBudgetServiceService);
    expect(service).toBeTruthy();
  });
});
