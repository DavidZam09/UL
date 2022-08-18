import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { DbService } from '../services/db.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginn: boolean = false;
  rol: 'Usuario' | 'Administrador' = null;
  userId: string = null;
  user: User = null;
  credentials = {
    user: null,
    password: null,
  }

  constructor(private fire: DbService, private auth: AuthService, private interaction: InteractionService, private rute: Router) {
    this.auth.stateUser().subscribe(res => {
      if (res) {
        console.log("logeado")
        this.loginn = false;
        this.getDataUser(res.uid)
        this.rute.navigate(['/ultra'])
        
      } else {
        console.log("no login")
        this.loginn = true
      }
    })
  }

  ngOnInit() {
    this.auth.stateUser().subscribe(res => {
      this.getUid();
      console.log(res, 'estado')
    });
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
  async getUid() {
    const id = await this.auth.getUid();
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
  async login() {
    await this.interaction.presentLoading('Cargando..');
    const answer = await this.auth.signIn(this.credentials.user, this.credentials.password).catch(error => {
      console.log(error);
      this.interaction.dismissLoading();
      this.interaction.presentToast('Error: Usuario o Contraseña incorrecta');
    });
    if (answer) {
      this.interaction.dismissLoading();
      this.interaction.presentToast('Ingreso Correcto');
      this.rute.navigate(['/ultra']);
      this.credentials.password = null;
      this.credentials.user = null;
    }
  }
}
