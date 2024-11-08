import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsClienteComponent } from './forms-cliente.component';

describe('FormsClienteComponent', () => {
  let component: FormsClienteComponent;
  let fixture: ComponentFixture<FormsClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
