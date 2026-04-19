import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerresComponent } from './ownerres.component';

describe('OwnerresComponent', () => {
  let component: OwnerresComponent;
  let fixture: ComponentFixture<OwnerresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
