import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayReportsComponent } from './display-reports.component';

describe('DisplayReportsComponent', () => {
  let component: DisplayReportsComponent;
  let fixture: ComponentFixture<DisplayReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
