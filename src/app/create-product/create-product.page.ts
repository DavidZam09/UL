import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cities, Product } from '../interfaces/product';
import { DbService } from '../services/db.service';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})
export class CreateProductPage implements OnInit {

  cities = Cities;

  data: Product = {
    id: this.database.getId(),
    nameProd: '',
    shop: '',
    stocks: null,
    price: null,
    purchased: null,
    city: null,
    gl: null
  }

  private ruter = 'products/';

  constructor(private database: DbService, private interaction: InteractionService, private rute: Router) { }

  ngOnInit() { }
  async createProduct() {
    await this.interaction.presentLoading('Creando...');
    await this.database.createDoc(this.data, this.ruter, this.data.id);
    this.interaction.presentToast('Creado con exito');
    this.interaction.dismissLoading();
    this.rute.navigate(['/inventory']);
  }
}
