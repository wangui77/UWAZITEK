import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimreportsComponent } from './claimreports.component';

describe('ClaimreportsComponent', () => {
  let component: ClaimreportsComponent;
  let fixture: ComponentFixture<ClaimreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimreportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
