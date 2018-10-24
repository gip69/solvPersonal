import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolvDbComponent } from './solv-db.component';

describe('SolvDbComponent', () => {
  let component: SolvDbComponent;
  let fixture: ComponentFixture<SolvDbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolvDbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolvDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
