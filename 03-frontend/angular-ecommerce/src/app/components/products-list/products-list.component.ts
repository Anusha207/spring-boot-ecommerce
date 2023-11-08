import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-products-list',
  templateUrl: './products-list-grid.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products!: Product[];
  currentCategoryId: number=1;
  previousCategoryId: number=1;
  // searchMode!:boolean;
  searchMode :boolean =false;
  // new properties for pagination
  thePagenumber:number=1;
  thePagesize:number=5;
  thetotalelements:number=0;
  
  previousKeyword:string="";


  constructor(private productservice:ProductService,private route:ActivatedRoute,private cartService:CartService){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{

   
    this.listproducts();
  });
    }
    listproducts(){
      this.searchMode=this.route.snapshot.paramMap.has('keyword');
      if(this.searchMode){
        this.handleSearchProducts();
      }else{
      this.handleListProducts();
      }
    }
    handleSearchProducts(){
      const theKeyword:string=this.route.snapshot.paramMap.get('keyword')!;
      //if we have diff keyword than previous
      //then set thepagenumber to 1
      if(this.previousKeyword!=theKeyword){
        this.thePagenumber=1;
      }
      this.previousKeyword=theKeyword;
      console.log(`keyword=${theKeyword},thePageNumber=${this.thePagenumber}`);

      //now search the products using given keyword
      this.productservice.searchProductsPaginate(this.thePagenumber-1,
        this.thePagesize,
        theKeyword).subscribe(this.processResult());

    }
   

    handleListProducts(){

         //check  if id parameter is available
         const hasCategoryId:boolean=this.route.snapshot.paramMap.has("id");
         if(hasCategoryId){
           //get the "id" paramstring.convert string to a numberusing the + symbol
           this.currentCategoryId=+ this.route.snapshot.paramMap.get("id")!;
         }
         else{
           //not category id availbale..deafult to category id 1
           this.currentCategoryId=1;
   
         }

         //check if we have a different category than previous
         //not:Angular will resuse a component  if it is currently being viewed
         //if we have a differemt category id than previous
         if(this.previousCategoryId !=this.currentCategoryId)
         {
          this.thePagenumber=1;
         }
         this.previousCategoryId=this.currentCategoryId;
         console.log(`currentCategoryId=${this.currentCategoryId},thepagenumber=${this.thePagenumber}`);


         //now get the products for the given category id
         this.productservice.getProductListPaginate(this.thePagenumber - 1,this.thePagesize,this.currentCategoryId).subscribe(this.processResult());
         ;
         
         
       
    }
    updatePageSize(pagesize:string){
      this.thePagesize=+pagesize;
      this.thePagenumber=1;
      this.listproducts();

    }
    processResult(){
      return (data:any)=>{
        this.products=data._embedded.products;
        this.thePagenumber=data.page.number + 1;
        this.thePagesize=data.page.size;
        this.thetotalelements=data.page.totalElements;

      };

    }
    addToCart(theProduct:Product){
      console.log(`Adding to cart:${theProduct.name},${theProduct.unitPrice}`);
      // TODO ...do the real work
      const theCartItem=new CartItem(theProduct);
      this.cartService.addToCart(theCartItem);
      
    }

}
