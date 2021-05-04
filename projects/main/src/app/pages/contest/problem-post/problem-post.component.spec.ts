import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemPostComponent } from './problem-post.component';

describe('ProblemComponent', () => {
  let component:ProblemPostComponent;
  let fixture: ComponentFixture<ProblemPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
