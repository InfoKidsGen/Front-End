import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
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
    private router: Router
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
      alert("As senhas não coincidem. ")
        
    }
    else{

      this.authService.cadastrar(this.usuario).subscribe((resp:Usuario) => {
        this.usuario=resp
          this.router.navigate(['/login'])
            alert("Usuario cadastrado com sucesso!")
      })
    }
  }
}
