import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private auth: AngularFireAuth, private rute: Router) { }

  async signIn(user: string, password: string) {
    return await this.auth.signInWithEmailAndPassword(user, password);
  }
  async register(data: User) {
    return await this.auth.createUserWithEmailAndPassword(data.mail, data.password);
  }
  async logout() {
    this.auth.signOut();
    this.rute.navigate(['/']);

  }
  async getUid() {
    const id = await this.auth.currentUser;
    if (id) {
      return id.uid;
    } else {
      return null;
    }
  }
  stateUser() {
    return this.auth.authState
  }

}
