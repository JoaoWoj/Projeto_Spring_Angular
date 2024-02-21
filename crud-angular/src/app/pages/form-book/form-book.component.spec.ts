import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBookComponent } from './form-book.component';

describe('FormBookComponent', () => {
  let component: FormBookComponent;
  let fixture: ComponentFixture<FormBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
