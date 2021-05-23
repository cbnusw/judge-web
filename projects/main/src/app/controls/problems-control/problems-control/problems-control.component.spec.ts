import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemsControlComponent } from './problems-control.component';

describe('ProblemsControlComponent', () => {
  let component: ProblemsControlComponent;
  let fixture: ComponentFixture<ProblemsControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemsControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
