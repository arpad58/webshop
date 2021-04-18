import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /* editor form */
  product$: Observable<Product> = this.activatedRoute.params.pipe(
    switchMap(params => {
      if (Number(params.id) === 0) {
        return of(new Product());
      }
      return this.productService.get(Number(params.id));
    })
  );

  /* create or update */
  onSubmit(form: NgForm, product: Product): void {
    try {
      if (product.id == 0) {
        this.productService.createProduct(product).subscribe(
          () => this.router.navigate(['/'])
        );
      }
      else {
        this.productService.updateProduct(product).subscribe(
          () => this.router.navigate(['/'])
        );
      }
    } catch (error) {
      // Error message
    }
  }
}
