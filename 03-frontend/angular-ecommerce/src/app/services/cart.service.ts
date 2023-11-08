import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItem:CartItem[]=[];
  totalPrice:Subject<number>=new Subject<number>();
  //subject is a subclass of observable
  totalQuantity:Subject<number>=new Subject<number>();


  constructor() { }
  addToCart(theCartItem:CartItem){
    //check if we have already item is in our  cart
    let alreadyExistsInCart :boolean=false;
    let existingCartItem!: CartItem;
    if(this.cartItem.length>0){
      // for(let tempCartItem of this.cartItem){
      //   if(tempCartItem.id==theCartItem.id){
      //     existingCartItem=tempCartItem;
      //     break;
      //   }
      // }
      existingCartItem!=this.cartItem.find(tempCartItem=>tempCartItem.id==theCartItem.id);
      alreadyExistsInCart=(existingCartItem!=undefined);

    }
    if(alreadyExistsInCart){
      existingCartItem.quantity++;
    }
    else{
      this.cartItem.push(theCartItem);
    }
    //compute cart total price and total quantty
this.computeCartTotals();

}  
  computeCartTotals() {
   let totalPriceValue:number=0;
   let totalQuantityValue:number=0;
   for(let currentCartItem of this.cartItem)
{
  totalPriceValue+=currentCartItem.quantity*currentCartItem.unitPrice;
  totalQuantityValue+=currentCartItem.quantity;
}
//publsig the new values ..all subscribers will recieve the new data

this.totalPrice.next(totalPriceValue);
this.totalQuantity.next(totalQuantityValue);

//log cart data just for debugging purposes
this.logCartData(totalPriceValue,totalQuantityValue);


}
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
   console.log("contents of th cart");
   for(let tempCartItem of this.cartItem){
    const subTotalPrice=tempCartItem.quantity*tempCartItem.unitPrice;
    console.log(`name:${tempCartItem.name},quantity=${tempCartItem.quantity},unitPrice=${tempCartItem.unitPrice}`);  
  
  }
  console.log(`totalPrice:${totalPriceValue.toFixed(2)},totalQuantity:${totalQuantityValue}`);
  console.log('--------');
  }
  




  }

