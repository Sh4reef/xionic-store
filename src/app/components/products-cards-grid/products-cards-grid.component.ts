import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-cards-grid',
  templateUrl: './products-cards-grid.component.html',
  styleUrls: ['./products-cards-grid.component.scss'],
})
export class ProductsCardsGridComponent implements OnInit {
  // @TODO: Products type must be implemented later
  @Input() data: Array<any>;

  constructor() { }

  ngOnInit() {}

}
