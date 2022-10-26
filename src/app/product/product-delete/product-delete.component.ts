import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Subscription} from "rxjs";
import {Product} from "../../model/product";

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

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

  ngOnInit() {
  }

  getProduct(id: number){
    this.productService.findProductById(id).
    subscribe(product =>{
      this.product = product;
    });
  }

  deleteProduct(id: number | undefined) {
    this.productService.deleteProduct(id).subscribe(() => {
      alert('Xóa thành công!');
      this.router.navigate(['/category/list']);
    }, e => {
      console.log(e);
    });
  }



}
