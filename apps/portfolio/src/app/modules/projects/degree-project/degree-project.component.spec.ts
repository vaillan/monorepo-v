import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeProjectComponent } from './degree-project.component';

describe('DegreeProjectComponent', () => {
  let component: DegreeProjectComponent;
  let fixture: ComponentFixture<DegreeProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DegreeProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegreeProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
