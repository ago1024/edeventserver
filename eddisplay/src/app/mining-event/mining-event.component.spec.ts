import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningEventComponent } from './mining-event.component';

describe('MiningEventComponent', () => {
  let component: MiningEventComponent;
  let fixture: ComponentFixture<MiningEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiningEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
