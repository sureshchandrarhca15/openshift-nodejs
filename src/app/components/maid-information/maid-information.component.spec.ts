import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaidInformationComponent } from './maid-information.component';

describe('MaidInformationComponent', () => {
  let component: MaidInformationComponent;
  let fixture: ComponentFixture<MaidInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaidInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaidInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
