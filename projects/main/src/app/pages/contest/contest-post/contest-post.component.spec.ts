import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestPostComponent } from './contest-post.component';

describe('ContestPostComponent', () => {
  let component: ContestPostComponent;
  let fixture: ComponentFixture<ContestPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
