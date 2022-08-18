import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../interfaces/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<Product>;
  private products: Observable<Product[]>;

  constructor(da: AngularFirestore) {

    this.productsCollection = da.collection<Product>('products');
    this.products = this.productsCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }

        });
      }
    ));
  }
  getProducts() {
    return this.products;
  }
  getProduct(id: string) {
    return this.productsCollection.doc<Product>(id).valueChanges();
  }
  updatePrudct(product: Product, id: string) {
    return this.productsCollection.doc(id).update(product);
  }
  addProduct(product: Product) {
    return this.productsCollection.add(product)
  }
  removeProduct(id: string) {
    return this.productsCollection.doc(id).delete();
  }
}
