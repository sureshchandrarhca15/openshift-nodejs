import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftPaneInfoComponent } from './left-pane-info.component';

describe('LeftPaneInfoComponent', () => {
  let component: LeftPaneInfoComponent;
  let fixture: ComponentFixture<LeftPaneInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftPaneInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftPaneInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
