import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoVitalComponent } from './signo-vital.component';

describe('SignoVitalComponent', () => {
  let component: SignoVitalComponent;
  let fixture: ComponentFixture<SignoVitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignoVitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoVitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
