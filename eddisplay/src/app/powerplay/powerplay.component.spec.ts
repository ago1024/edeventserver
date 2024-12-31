import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerplayComponent } from './powerplay.component';

describe('PowerplayComponent', () => {
  let component: PowerplayComponent;
  let fixture: ComponentFixture<PowerplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowerplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowerplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
