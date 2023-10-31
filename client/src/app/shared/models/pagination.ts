import { Book } from "./book"

export interface Pagination<T> {
    pageIndex: number
    pageSize: number
    count: number
    data: T
  }