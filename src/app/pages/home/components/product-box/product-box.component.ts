import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

declare global {
  interface Window { dataLayer: any[]; }
}

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {

  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart(): void{
    this.addToCart.emit(this.product);
    // window.dataLayer.push({
    //   event:'add_to_cart',
    //   ecommece :{
    //     items:[
    //       {
    //        item_id:this.product?.id,
    //        item_name: this.product?.title,
    //        item_category: this.product?.category,
    //        item_price:this.product?.price
    //       }
    //      ]
    //   }
    // })
  }

}
