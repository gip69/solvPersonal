
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickTableComponent } from './tick-table.component';

describe('TickTableComponent', () => {
  let component: TickTableComponent;
  let fixture: ComponentFixture<TickTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TickTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TickTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
