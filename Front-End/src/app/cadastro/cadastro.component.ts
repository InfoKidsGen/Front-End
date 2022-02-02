import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario: Usuario = new Usuario()
  confirmarSenha: string
  tipoUsuario: string

  constructor (

    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

  }

  confirmSenha(event: any){

    this.confirmarSenha=event.target.value

  }

  tipoUser(event: any){

  this.tipoUsuario=event.target.value

  }

  cadastro(){

  this.usuario.perfis=this.tipoUsuario
    if (this.usuario.senha != this.confirmarSenha){
      this.alertas.showAlertDanger("As senhas não coincidem. ")
        
    }
    else{

      this.authService.cadastrar(this.usuario).subscribe((resp:Usuario) => {
        this.usuario=resp
          this.router.navigate(['/login'])
            this.alertas.showAlertSucess("Usuario cadastrado com sucesso!")
      })
    }
  }
}
