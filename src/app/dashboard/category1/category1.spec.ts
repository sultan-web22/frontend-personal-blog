import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Category1 } from './category1';

describe('Category1', () => {
  let component: Category1;
  let fixture: ComponentFixture<Category1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Category1],
    }).compileComponents();

    fixture = TestBed.createComponent(Category1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
