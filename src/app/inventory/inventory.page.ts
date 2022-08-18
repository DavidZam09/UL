import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Product } from '../interfaces/product';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';
import { InteractionService } from '../services/interaction.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  private rute = 'products/';
  login: boolean = false;
  products: Product[] = [];
  data: Product;
  rol: 'Usuario' | 'Administrador' = null;
  sProduct: any;

  constructor(private prod: ProductService, private route: Router, private auth: AuthService, private fire: DbService, private inter: InteractionService) {
    this.auth.stateUser().subscribe(res => {
      if (res) {
        console.log("logeado")
        this.login = false;
        this.getDataUser(res.uid)
      } else {
        console.log("no login")
        res.uid = null;
        this.login = true
        this.route.navigate([''])
      }
    })
  }

  async ngOnInit() {
    await this.inter.presentLoadingOnly();
    this.prod.getProducts().subscribe(answer => {
      this.products = answer;
      this.inter.dismissLoading();
      this.sProduct = this.data;
    })

  }
  deleteUser(id: Product) {
    this.fire.deleteDoc(this.rute, id.id)
  }
  updateProduct(id: Product) {
    this.data = id;
  }
  getDataUser(uid: string) {
    const path = "users/";
    const id = uid;
    this.fire.getDoc<User>(path, id).subscribe(res => {
      if (res) {
        this.rol = res.perfil
      }
    });
  }
}
