import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  // @TODO: Product type must be implemented later
  @Input() data: any;
  // @TODO: Variation type must be implemented later
  selectedVariation: object;

  constructor() { }

  ngOnInit() {
    if (this.data.variations.length) {
      this.selectedVariation = Object.assign({}, this.data.variations[0]);
    }
  }

}
