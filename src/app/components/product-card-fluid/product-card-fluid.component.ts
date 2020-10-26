import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card-fluid',
  templateUrl: './product-card-fluid.component.html',
  styleUrls: ['./product-card-fluid.component.scss'],
})
export class ProductCardFluidComponent implements OnInit {
  // @TODO: Product type must be implemented later
  @Input() data: any;

  constructor() { }

  ngOnInit() {}

}
