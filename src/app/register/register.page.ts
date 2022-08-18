import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Roles, User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  login: boolean = false;
  rol: 'Usuario' | 'Administrador' = null;
  roles = Roles;
  data: User = {
    uid: '',
    mail: '',
    Name: '',
    lastname: '',
    password: '',
    perfil: null
  }

  private ruter = 'users/';

  constructor(private database: DbService, private auth: AuthService, private interaction: InteractionService, private rute: Router) {
    this.auth.stateUser().subscribe(res => {
      if (res) {
        this.login = false;
        this.getDataUser(res.uid)
      } else {
        this.login = true
        this.rute.navigate([''])
      }
    })
  }

  ngOnInit() { }
  async register() {
    await this.interaction.presentLoading('Cargando..')
    const answer = await this.auth.register(this.data).catch(error => {
      console.log(error);
      this.interaction.dismissLoading();
      this.interaction.presentToast('Error de registro');
    })
    if (answer) {
      const id = answer.user.uid;
      this.data.uid = id;
      this.data.password = null;
      await this.database.createDoc(this.data, this.ruter, id);
      this.interaction.dismissLoading();
      this.interaction.presentToast('Registro Exitoso');
      this.rute.navigate(['/usermanagement']);
    }
  }
  getDataUser(uid: string) {
    const path = "users/";
    const id = uid;
    this.database.getDoc<User>(path, id).subscribe(res => {
      if (res) {
        this.rol = res.perfil
      }
    });
  }
}
