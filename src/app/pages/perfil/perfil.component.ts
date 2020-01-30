import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nombre: string;

  roles: Array<string>;

  constructor() { }

  ngOnInit() {

    this.nombreRolesUsuario();
  }

  nombreRolesUsuario(){

    const helper = new JwtHelperService();

    let decodedToken=helper.decodeToken(sessionStorage.getItem(environment.TOKEN_NAME));

    this.nombre=decodedToken.user_name;

    this.roles=decodedToken.authorities;

    console.log(this.nombre);

    console.log(this.roles);
  }

}
