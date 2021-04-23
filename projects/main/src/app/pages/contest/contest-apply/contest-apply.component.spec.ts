import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestApplyComponent } from './contest-apply.component';

describe('ContestApplyComponent', () => {
  let component: ContestApplyComponent;
  let fixture: ComponentFixture<ContestApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestApplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
