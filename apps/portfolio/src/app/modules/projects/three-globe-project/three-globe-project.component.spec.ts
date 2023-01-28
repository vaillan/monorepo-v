import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeGlobeProjectComponent } from './three-globe-project.component';

describe('ThreeGlobeProjectComponent', () => {
  let component: ThreeGlobeProjectComponent;
  let fixture: ComponentFixture<ThreeGlobeProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeGlobeProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeGlobeProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
