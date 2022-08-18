import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.page.html',
  styleUrls: ['./usermanagement.page.scss'],
})
export class UsermanagementPage implements OnInit {
  rol: 'Usuario' | 'Administrador' = null;
  loginn: boolean = false;
  users: User[] = [];
  private rute = 'users/';
  constructor(private ruter: Router, private auth: AuthService, private database: DbService, private inter: InteractionService) {
    this.auth.stateUser().subscribe(res => {
      if (res) {
        this.loginn = false;
        this.getDataUser(res.uid)
      } else {
        this.loginn = true
        this.ruter.navigate(['/ultra'], { skipLocationChange: true });
      }
    })
  }

  ngOnInit() {
    this.getUsers();
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
  async getUsers() {
    await this.inter.presentLoadingOnly();
    this.database.getCollection<User>(this.rute).subscribe(answer => {
      this.users = answer;
      this.inter.dismissLoading();
    });
  }
}
