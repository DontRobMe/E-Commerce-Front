import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgameComponent } from './addgame.component';

describe('AddgameComponent', () => {
  let component: AddgameComponent;
  let fixture: ComponentFixture<AddgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddgameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
