import { Component, OnInit } from '@angular/core';
import { Cart } from './models/cart.model';
import { CartService } from './services/cart.service';
import { NonceService } from './services/nonce.service';


declare var gtag: Function;
declare global {
  interface Window { dataLayer: any[]; }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'E-commerce Luna';
  cart: Cart = { items: []};
  nonce: string ='';
  cspContent: string ='';
  constructor(private cartService: CartService, 
    private nonceService: NonceService){}

  ngOnInit(): void {
    this.nonce = this.nonceService.generateNonce();
    this.cspContent = ` script-src 'nonce-${this.nonce}'; img-src www.googletagmanager.com;
    connect-src www.googletagmanager.com`;
    this.start();
    this.loadGTM();
    this.cspContentLoad();
  }

  start(){
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    })
  }

  cspContentLoad(){
   const meta = document.createElement('meta');
   meta.setAttribute('http-equiv','Content-Security-Policy');
   meta.setAttribute('contnet',this.cspContent);
   document.head.appendChild(meta);

  }

  loadGTM() {


    const nonceId = document.getElementById('gtmScript');
    nonceId?.setAttribute('nonce',this.nonce);

  }
}