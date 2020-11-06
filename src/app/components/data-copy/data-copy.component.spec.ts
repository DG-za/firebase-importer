import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCopyComponent } from './data-copy.component';

describe('DataCopyComponent', () => {
  let component: DataCopyComponent;
  let fixture: ComponentFixture<DataCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataCopyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
