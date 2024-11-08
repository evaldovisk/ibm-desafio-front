import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsTransferenciaComponent } from './forms-transferencia.component';

describe('FormsTransferenciaComponent', () => {
  let component: FormsTransferenciaComponent;
  let fixture: ComponentFixture<FormsTransferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsTransferenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsTransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
