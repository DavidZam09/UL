import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  login: boolean = false;
  rol: 'Usuario' | 'Administrador' = null;
  userId: string = null;
  user: User = null;
  constructor(private database: AuthService, private fire: DbService) { 
    this.database.stateUser().subscribe(res => {
      if (res) {
        console.log("logeado")
        this.login = false;
        this.getDataUser(res.uid)
      } else {
        console.log("no login")
        this.login = true

      }
    })
  }

  async ngOnInit() {

    this.database.stateUser().subscribe(res => {
      this.getUid();
      console.log(res, 'estado')
    });

  }

  async getUid() {
    const id = await this.database.getUid();
    if (id) {
      this.userId = id;
      this.getInfoUser();
    } else {
      console.log("no user")
    }
  }
  getInfoUser() {
    const path = 'users/';
    const id = this.userId;
    this.fire.getDoc<User>(path, id).subscribe(res => {
      if (res) {
        this.user = res;
      }

    })
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
