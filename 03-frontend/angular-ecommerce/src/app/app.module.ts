import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import{ HttpClientModule } from '@angular/common/http'
import { ProductService } from './services/product.service';

import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { ProductCategory } from './common/product-category';
import { MenuComponentComponent } from './components/menu-component/menu-component.component';
import { CartDeatilsComponent } from './components/cart-deatils/cart-deatils.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
  
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    MenuComponentComponent,
    CartDeatilsComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  productCategories: ProductCategory[]=[];
}
