import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridListComponent } from './grid-list.component';
import { CommonModule } from '@angular/common';

describe('GridListComponent', () => {
  let component: GridListComponent;
  let fixture: ComponentFixture<GridListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridListComponent, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GridListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
