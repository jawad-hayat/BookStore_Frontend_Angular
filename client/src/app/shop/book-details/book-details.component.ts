import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book?: Book;
  quantity = 1;
  quantityInBasket = 0;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService, private basketService: BasketService) {
      this.bcService.set('@bookDetails', ' ')
    }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) this.shopService.getBook(+id).subscribe({
      next: response => {this.book = response;
      this.bcService.set('@bookDetails',this.book.name);
      this.basketService.basketSource$.pipe(take(1)).subscribe({
        next: basket => {
          const item = basket?.items.find(x => x.id === +id);
          if (item) {
            this.quantity = item.quantity;
            this.quantityInBasket = item.quantity;
          }
        }
      })
      },
      error: error => console.log(error)
    })
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    this.quantity--;
  }

  updateBasket() {
    if (this.book) {
      if (this.quantity > this.quantityInBasket) {
        const itemsToAdd = this.quantity - this.quantityInBasket;
        this.quantityInBasket += itemsToAdd;
        this.basketService.addItemToBasket(this.book, itemsToAdd);
      } else {
        const itemsToRemove = this.quantityInBasket - this.quantity;
        this.quantityInBasket -= itemsToRemove;
        this.basketService.removeItemFromBasket(this.book.id, itemsToRemove);
      }
    }
  }

  get buttonText() {
    return this.quantityInBasket === 0 ? 'Add to basket' : 'Update basket';
  }

}