import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Book } from '../shared/models/book';
import { ShopService } from './shop.service';
import { Brand } from '../shared/models/brands';
import { Type } from '../shared/models/types';
import { ShopParams } from '../shared/models/shopParams';



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm?: ElementRef;
  books: Book[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  shopParams = new ShopParams();
  sortSelected = "name";
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];
  totalCount = 0;

  constructor(private shopService: ShopService){}

  ngOnInit(): void {
    this.getBooks();
    this.getBrands();
    this.getTypes();
  }

  getBooks(){
    this.shopService.getBooks(this.shopParams).subscribe(
      (response) => {
        this.books = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBrands(){
    this.shopService.getBrands().subscribe(
      (response) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTypes(){
    this.shopService.getTypes().subscribe(
      (response) => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getBooks();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getBooks();
  }

  // onSortSelected(sort: string) {
  //   this.shopParams.sort = sort;
  //   this.getBooks();
  // }

  onSortSelected(event: any) {
    this.shopParams.sort = event.target.value;
    this.getBooks();
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getBooks();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getBooks();
  }

  onReset() {
    if(this.searchTerm)  this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getBooks();
  }


}
