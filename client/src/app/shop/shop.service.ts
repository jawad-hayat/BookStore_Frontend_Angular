import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Book } from '../shared/models/book';
import { Brand } from '../shared/models/brands';
import { Type } from '../shared/models/types';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "https://localhost:7120/";
  products: Book[] = [];
  brands: Brand[] = [];
  types: Type[] = [];

  
  constructor(private http: HttpClient) { }

  getBooks(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brandId !== 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }

    if (shopParams.typeId !== 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if(shopParams.search){
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber);
    params = params.append('pageSize', shopParams.pageSize);
    
    return this.http.get<Pagination<Book[]>>(this.baseUrl + 'api/books', {params:params});
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + 'api/Books/brands');
  }

  getBook(id: number) {
    return this.http.get<Book>(this.baseUrl + 'api/books/' + id);
  }

  getTypes() {
    return this.http.get<Type[]>(this.baseUrl + 'api/Books/types');
  }

}
