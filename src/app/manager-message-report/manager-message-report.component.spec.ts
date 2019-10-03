import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerMessageReportComponent } from './manager-message-report.component';

describe('ManagerMessageReportComponent', () => {
  let component: ManagerMessageReportComponent;
  let fixture: ComponentFixture<ManagerMessageReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerMessageReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerMessageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
