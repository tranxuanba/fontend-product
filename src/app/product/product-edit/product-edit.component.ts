import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from "rxjs";
import {Product} from "../../model/product";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {


  sub:Subscription;

  product: Product = {
    id:0,
    name:"name",
    description: "Mo ta",
    price: 0
  };

  id: number | undefined;

  constructor(private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe( (paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getProduct(this.id);
    })
  }

  ngOnInit(): void {

  }

  getProduct(id: number){
    this.productService.findProductById(id).
    subscribe(product =>{
      this.product = product;
    });
  }

  updateProduct(){
    this.productService.editProduct(this.product.id, this.product).subscribe(()=>{
      this.router.navigate(['/']);
    });
    // this.router.navigateByUrl("/");

  }
}
