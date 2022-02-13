import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor(

    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService

  ) { }

  ngOnInit() {

    window.scroll(0,0)
  }

  entrar(){

    this.authService.login(this.usuarioLogin).subscribe({next: (resp: UsuarioLogin)=> {
      this.usuarioLogin = resp
        environment.token = this.usuarioLogin.token
        environment.id = this.usuarioLogin.id
        environment.nomeCompleto = this.usuarioLogin.nomeCompleto
        environment.foto = this.usuarioLogin.foto

        this.router.navigate(['/inicio'])

    }, error: error => {
        if(error.status == 401 ){
          this.alertas.showAlertDanger('Usuário ou Senha incorretos.')
        }
    },})
  }
}
