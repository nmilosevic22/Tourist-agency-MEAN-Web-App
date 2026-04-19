import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnercottagesComponent } from './ownercottages.component';

describe('OwnercottagesComponent', () => {
  let component: OwnercottagesComponent;
  let fixture: ComponentFixture<OwnercottagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnercottagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnercottagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
