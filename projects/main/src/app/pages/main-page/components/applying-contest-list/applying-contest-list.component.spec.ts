import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyingContestListComponent } from './applying-contest-list.component';

describe('ApplyingContestListComponent', () => {
  let component: ApplyingContestListComponent;
  let fixture: ComponentFixture<ApplyingContestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyingContestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyingContestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
