import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProvidertemplateComponent } from './main-providertemplate.component';

describe('MainProvidertemplateComponent', () => {
  let component: MainProvidertemplateComponent;
  let fixture: ComponentFixture<MainProvidertemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainProvidertemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProvidertemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
