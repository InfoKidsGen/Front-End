import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  tema: Tema = new Tema()
  user: Usuario = new Usuario()
  idTema : number
  idUser = environment.id
  nome = environment.nomeCompleto

  listaTemas: Tema[]
  listaPostagens: Postagem[]

  constructor(
    private postagemService: PostagemService,
    private authService: AuthService,
    private temaService: TemaService,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0, 0)

    if(environment.token == ''){
      this.router.navigate(['/login'])
    }
    this.authService.refreshToken()
    this.getAllTemas()
    this.getAllPostagens()
  }

  getAllTemas(){
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  findByIdUser(){
    this.authService.getByIUser(this.idUser).subscribe((resp: Usuario) => {
      this.user = resp
        console.log(resp)
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp

    })
  }

  publicar(){
    // relacionamento entre tabelas Tema e Postagem
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    // relacionamento entre tabelas Usuário e Postagem
    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp

      alert('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })

  }

}
