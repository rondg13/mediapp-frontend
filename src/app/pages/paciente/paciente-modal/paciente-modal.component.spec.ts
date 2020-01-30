import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteModalComponent } from './paciente-modal.component';

describe('PacienteModalComponent', () => {
  let component: PacienteModalComponent;
  let fixture: ComponentFixture<PacienteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
