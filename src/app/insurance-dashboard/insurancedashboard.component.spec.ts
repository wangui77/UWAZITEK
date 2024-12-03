import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancedashboardComponent } from './insurancedashboard.component';

describe('InsurancedashboardComponent', () => {
  let component: InsurancedashboardComponent;
  let fixture: ComponentFixture<InsurancedashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsurancedashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsurancedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
