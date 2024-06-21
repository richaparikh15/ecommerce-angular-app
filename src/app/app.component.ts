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
    // const script = document.createElement('script');
    // script.src = `https://www.googletagmanager.com/gtag/js?id=GTM-5JGL95PG`;
    // script.setAttribute('nonce', this.nonce); // Set nonce attribute
    // script.setAttribute('id','gtmScript');
    // script.async = true;
    // script.onload = () => {
    //   // Initialize gtag function once script is loaded
    //   window['dataLayer'] = window['dataLayer'] || [];
    //   function gtag(...args: any[]) {
    //     window['dataLayer'].push(arguments);
    //   }

    //   // Initialize gtag and configure Google Analytics
    //   gtag('js', new Date());
    //   gtag('config', 'GTM-5JGL95PG'); // Replace with your Google Analytics Measurement ID
    // };

    // // Append script to the head of the document
    // document.head.appendChild(script);

    var nonceId = document.getElementById('gtmScript');
    
  }
}
