import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAnalitysProjectComponent } from './data-analitys-project.component';

describe('DataAnalitysProjectComponent', () => {
  let component: DataAnalitysProjectComponent;
  let fixture: ComponentFixture<DataAnalitysProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAnalitysProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataAnalitysProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
