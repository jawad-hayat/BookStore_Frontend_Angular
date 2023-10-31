import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { SharedModule } from '../shared/shared.module';
import { BookItemComponent } from './book-item/book-item.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { ShopRoutingModule } from './shop-routing.module';


@NgModule({
  declarations: [
    ShopComponent,
    BookItemComponent,
    BookDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }