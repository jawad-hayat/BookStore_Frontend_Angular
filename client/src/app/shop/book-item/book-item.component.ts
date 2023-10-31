import { Component, Input } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Book } from 'src/app/shared/models/book';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent {
@Input() book?: Book

constructor(private basketService: BasketService) {}

  addItemToBasket() {
    this.book && this.basketService.addItemToBasket(this.book);
  }

}
