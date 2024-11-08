import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoContaComponent } from './info-conta.component';

describe('InfoContaComponent', () => {
  let component: InfoContaComponent;
  let fixture: ComponentFixture<InfoContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoContaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
