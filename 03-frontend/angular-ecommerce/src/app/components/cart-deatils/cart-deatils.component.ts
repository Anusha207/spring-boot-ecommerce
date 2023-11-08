import { Component,OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-deatils',
  templateUrl: './cart-deatils.component.html',
  styleUrls: ['./cart-deatils.component.css']
})
export class CartDeatilsComponent implements OnInit {
  cartItem:CartItem[]=[];
  totalPrice:number=0;
  totalQuantity:number=0;
  constructor(private cartService:CartService){}
  ngOnInit(): void {
    this.listCartdetails();
    
  }
  listCartdetails() {
    //get a handle to the cart items
    this.cartItem=this.cartService.cartItem;

    //subscrobe tp the cart total price
    this.cartService.totalPrice.subscribe(
      data=>this.totalPrice=data
    );
   

    //subscribe to the cart total  qunatity
    this.cartService.totalQuantity.subscribe(
      data=>this.totalQuantity=data
    );
    //compute cart total price and quantity
    this.cartService.computeCartTotals();
  }

}
