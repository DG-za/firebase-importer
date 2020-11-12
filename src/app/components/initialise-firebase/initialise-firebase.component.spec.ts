import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialiseFirebaseComponent } from './initialise-firebase.component';

describe('InitialiseFirebaseComponent', () => {
  let component: InitialiseFirebaseComponent;
  let fixture: ComponentFixture<InitialiseFirebaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialiseFirebaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialiseFirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
