import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card-fluid-list',
  templateUrl: './product-card-fluid-list.component.html',
  styleUrls: ['./product-card-fluid-list.component.scss'],
})
export class ProductCardFluidListComponent implements OnInit {
  // @TOOD: Products type must be implemented later
  @Input() data: Array<any>;
  @Input() headline: string;

  constructor() { }

  ngOnInit() {}

}
