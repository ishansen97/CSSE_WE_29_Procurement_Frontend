import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSiteBudgetComponent } from './manager-site-budget.component';

describe('ManagerSiteBudgetComponent', () => {
  let component: ManagerSiteBudgetComponent;
  let fixture: ComponentFixture<ManagerSiteBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerSiteBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSiteBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
