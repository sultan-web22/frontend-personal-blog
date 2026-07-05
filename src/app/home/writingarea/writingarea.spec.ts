import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Writingarea } from './writingarea';

describe('Writingarea', () => {
  let component: Writingarea;
  let fixture: ComponentFixture<Writingarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Writingarea],
    }).compileComponents();

    fixture = TestBed.createComponent(Writingarea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
