import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles, User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

import { DbService } from '../services/db.service';
import { FirestorageService } from '../services/firestorage.service';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  data: User = {
    uid: '', Name: '', lastname: '', mail: '', password: '', perfil: null,
  }
  private rute = 'users/';
  login: boolean = false;
  rol: 'Usuario' | 'Administrador' = null;
  roles = Roles;
  UserId = null;
  constructor(
    private database: DbService,
    private route: Router,
    private router: ActivatedRoute,
    private load: InteractionService,
    private auth: AuthService,
    private ruter: Router,
    private storage: FirestorageService
  ) {
    this.auth.stateUser().subscribe(res => {
      if (res) {
        this.login = false;
        this.getDataUser(res.uid)
      } else {
        this.login = true
        this.ruter.navigate([''])
      }
    })
  }

  ngOnInit() {
    this.UserId = this.router.snapshot.params['id'];
    if (this.UserId) {
      this.loadUser();
    }
  }
  async loadUser() {
    await this.load.presentLoading('Cargando...');
    this.database.getUser(this.UserId).subscribe(answer => {
      this.load.dismissLoading();
      this.data = answer;
    })
  }
  async updateUser() {
    await this.load.presentLoading('Creando...');
    await this.database.editDoc(this.data, this.rute, this.UserId);
    this.load.presentToast('Guardado con exito');
    this.load.dismissLoading();
    this.route.navigate(['/usermanagement']);
  }
  delete(id: string) {
    this.database.deleteDoc(this.rute, id)
    this.route.navigate(['/usermanagement'])
  }
  getDataUser(uid: string) {
    const id = uid;
    this.database.getDoc<User>(this.rute, id).subscribe(res => {
      if (res) {
        this.rol = res.perfil
      }
    });
  }
  async photoUp(event: any) {
    const path = 'Users';
    const nombre = 'img';
    const file = event.target.files[0];
    const res = await this.storage.uploadFile(file, path, nombre);
    console.log(res)

  }
}
