import { Component, OnInit } from '@angular/core';
import { Cities, Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InteractionService } from '../services/interaction.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.page.html',
  styleUrls: ['./product-management.page.scss'],
})
export class ProductManagementPage implements OnInit {
  data: Product = {
    id: '', nameProd: '', shop: '', price: null, city: null, purchased: null, stocks: null, gl: null
  }
  cities = Cities;
  ruter = 'products/'
  productId = null;
  constructor(private database: DbService,
    private rute: Router,
    private router: ActivatedRoute,
    private load: InteractionService,
    private productService: ProductService) { }

  ngOnInit() {
    this.productId = this.router.snapshot.params['id'];
    if (this.productId) {
      this.loadProduct();
    }
  }
  async loadProduct() {
    await this.load.presentLoading('Cargando...');
    this.productService.getProduct(this.productId).subscribe(answer => {
      this.load.dismissLoading();
      this.data = answer;
    })

  }
  async updateProduct() {
    await this.load.presentLoading('Creando...');
    await this.database.editDoc(this.data, this.ruter, this.productId);
    this.load.presentToast('Guardado con exito');
    this.load.dismissLoading();
    this.rute.navigate(['/inventory']);
  }
  deleteProduct(id: string) {
    this.database.deleteDoc(this.ruter, id)
  }
}
