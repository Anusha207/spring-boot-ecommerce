import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
 

  private baseUrl="http://localhost:8080/api/products"
  private categoryUrl="http://localhost:8080/api/product-category";
  constructor(private httpclient:HttpClient) { }

  getProductListPaginate(thePage:number,thePageSize:number, theCategoryId:number):Observable<GetResponseProducts>{
    //need to build url based on category id,size,pagesize 
    const serachUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
    +`&page=${thePage}&size=${thePageSize}`;
    return this.httpclient.get<GetResponseProducts>(serachUrl);
    
  }
  getProductList(theCategoryId:number):Observable<Product[]>{
    //need to build url based on category id: 
    const serachUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(serachUrl);
    
  }
 
  searchProducts(theKeyword: string):Observable<Product[]> {
     //need to build url based on keyword: 
    const serachUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(serachUrl);
  }
  searchProductsPaginate(thePage:number,
    thePageSize:number, 
    theKeyword:string):Observable<GetResponseProducts>{
    //need to build url based on keyword,size,pagesize 
    const serachUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
          +`&page=${thePage}&size=${thePageSize}`;
    return this.httpclient.get<GetResponseProducts>(serachUrl);
    
  }
    

    private getProducts(serachUrl: string): Observable<Product[]> {
      return this.httpclient.get<GetResponseProducts>(serachUrl).pipe(map(response => response._embedded.products));
    }
    // getProductCategories():Observable<ProductCategory[]> {
    //   return this.httpclient.get<GetResponseProductCategory>(this.categoryUrl).pipe(map(response=>response._embedded.productCategories))
    // }
    getProduct(theProductId: number):Observable<Product> {
      
      const productUrl=`${this.baseUrl}/${theProductId}`;
      return this.httpclient.get<Product>(productUrl);
    }
}
interface GetResponseProducts{
  _embedded:{
    products:Product[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number :number
  }
}
// interface GetResponseProductCategory{
//   _embedded:{
//     productCategories:ProductCategory[];
//   }
// }
