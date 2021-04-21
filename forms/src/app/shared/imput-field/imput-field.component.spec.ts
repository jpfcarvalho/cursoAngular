import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImputFieldComponent } from './imput-field.component';

describe('ImputFieldComponent', () => {
  let component: ImputFieldComponent;
  let fixture: ComponentFixture<ImputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImputFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
