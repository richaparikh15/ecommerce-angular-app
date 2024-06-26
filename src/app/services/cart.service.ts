import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new BehaviorSubject<Cart>({ items: []});

  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item: CartItem): void{
    const items = [...this.cart.value.items];
    const itemsArray: { item_id: number; item_name: string; item_quantity: number; item_product: string; }[] =[];

    const itemInCart = items.find((_item) => item.id === _item.id);

    if(itemInCart){
      itemInCart.quantity += 1;
    }else{
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open('1 item added to cart.', 'Ok', { duration: 3000 }); // 3 seconds
    console.log(this.cart.value);

    items.forEach(item => {
      itemsArray.push({
        item_id: item.id,
        item_name: item.name,
        item_quantity: item.quantity,
        item_product:item.product
      })
    });
    
    window.dataLayer.push({
      event:'view_cart',
      ecommece :{
        items:itemsArray
      }
    })
  }

  getTotal(items: Array<CartItem>): number{
    return items.map((item)=> item.price * item.quantity)
    .reduce((prev, current) => prev + current, 0)
  }

  clearCart(): void{
    this.cart.next({ items: []});
    this._snackBar.open('Cart is cleared', 'Ok', {duration: 3000}); // message to the user
  }

  removeFromCart(item: CartItem, update = true): Array<CartItem>{
    const filteredItems = this.cart.value.items.filter(
      (_item)=> _item.id !== item.id
    );

    if(update){
      this.cart.next({ items: filteredItems });
      this._snackBar.open('1 item removed from cart', 'Ok', { duration: 3000});
    }

    return filteredItems;
  }

  removeQuantity(item: CartItem): void{
    let itemForRemoval: CartItem | undefined;
    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id){
        _item.quantity--;
        if(_item.quantity === 0){
          itemForRemoval = _item;
        }
      }
      return _item;
    });

    if(itemForRemoval){
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }
    this.cart.next({ items: filteredItems });
    this._snackBar.open('1 item removed from cart.', 'Ok', { duration: 3000});
  }

}
