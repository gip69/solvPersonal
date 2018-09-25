import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavdemoComponent } from './navdemo.component';

describe('NavdemoComponent', () => {
  let component: NavdemoComponent;
  let fixture: ComponentFixture<NavdemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavdemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavdemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
