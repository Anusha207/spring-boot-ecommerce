import { Component,OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.css']
})
export class MenuComponentComponent implements OnInit{
  productCategories!: ProductCategory[];
  constructor(private productservice:ProductService){}
  ngOnInit(): void {}
  //   this.listProductCategories();
    
  // }
  // listProductCategories() {
  //   this.productservice.getProductCategories().subscribe(
  //     data=>{
  //       // console.log('product Categories='+JSON.stringify(data))
  //       this.productCategories=data;
  //     }
  //   )
  // }

}

