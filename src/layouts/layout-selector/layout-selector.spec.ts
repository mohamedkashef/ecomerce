import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSelector } from './layout-selector';

describe('LayoutSelector', () => {
  let component: LayoutSelector;
  let fixture: ComponentFixture<LayoutSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
