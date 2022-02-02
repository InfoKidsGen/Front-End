import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  confirmarSenha: string
  tipoUsuario: string
  idUser: number
  
  constructor(

    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == ''){
    this.router.navigate(['/login'])}
    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: Usuario) => {
    this.usuario = resp

    })

  }

  confirmSenha(event: any) {

    this.confirmarSenha = event.target.value

  }

  tipoUser(event: any) {

    this.tipoUsuario = event.target.value

  }

  atualizar() {

    this.usuario.perfis = this.tipoUsuario
    if (this.usuario.senha != this.confirmarSenha) {
      alert("As senhas não coincidem. ")

    }
    else {

      this.authService.atualizar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/login'])
        alert("Usuario atualizado com sucesso, realize o login novamente! ")

          environment.token= ''
          environment.foto= ''
          environment.id= 0
          environment.nomeCompleto= ''
      })
    }
  }
}