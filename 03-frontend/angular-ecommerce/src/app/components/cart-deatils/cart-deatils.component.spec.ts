import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDeatilsComponent } from './cart-deatils.component';

describe('CartDeatilsComponent', () => {
  let component: CartDeatilsComponent;
  let fixture: ComponentFixture<CartDeatilsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartDeatilsComponent]
    });
    fixture = TestBed.createComponent(CartDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
