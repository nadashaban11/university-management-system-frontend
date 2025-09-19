import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentPageComponent } from './enrollment-page.component';

describe('EnrollmentPageComponent', () => {
  let component: EnrollmentPageComponent;
  let fixture: ComponentFixture<EnrollmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
