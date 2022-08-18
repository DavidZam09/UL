import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private firecollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;

  constructor(private fire: AngularFirestore,) {
    this.firecollection = fire.collection<User>('users');
    this.users = this.firecollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }

        });
      }
    ));
  }
  getUsers() {
    return this.users;
  }
  getUser(id: string) {
    return this.firecollection.doc<User>(id).valueChanges();
  }

  async createDoc(data: any, rute: string, id: string) {
    try {
      const answer = this.fire.collection(rute);
      return answer.doc(id).set(data);
    } catch (error) {
      console.log('error on CreateDoc --->', error)
    }

  }
  deleteDoc(rute: string, id: string) {
    const answer = this.fire.collection(rute);
    return answer.doc(id).delete();

  }
  getDoc<tipo>(rute: string, id: string) {
    return this.fire.collection(rute).doc<tipo>(id).valueChanges();

  }
  editDoc(data: any, rute: string, id: string) {
    const answer = this.fire.collection(rute);
    return answer.doc(id).update(data);

  }
  getId() {
    return this.fire.createId();
  }
  getCollection<tipo>(rute: string) {
    const answer = this.fire.collection<tipo>(rute);
    return answer.valueChanges();
  }
  async getAll(rute) {
    try {
      return await this.fire.collection(rute).snapshotChanges();
    } catch (error) {
      console.log('error on getAll--> ', error);
    }
  }
}
