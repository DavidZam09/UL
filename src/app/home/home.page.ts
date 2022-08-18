import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: User;
  login: boolean = false;
  rol: 'Usuario' | 'Administrador' = null;
  sus: any;

  constructor(private auth: AuthService,
    private interaction: InteractionService,
    private rute: Router, private bd: DbService) {

    this.sus = this.auth.stateUser().subscribe(res => {
      if (res) {
        this.login = false;
        this.getDataUser(res.uid)
        this.rute.navigate['/'];
      } else {
        this.login = true

      }
    })

  }
  ngOnInit() {


  }
  logout() {
    this.auth.logout();
    this.interaction.presentToast('logout');
  }
  getDataUser(uid: string) {
    const path = "users/";
    const id = uid;
    this.bd.getDoc<User>(path, id).subscribe(res => {
      if (res) {
        this.rol = res.perfil
      }
    });
  }
  ngOnDestroy(): void {
  }
}


