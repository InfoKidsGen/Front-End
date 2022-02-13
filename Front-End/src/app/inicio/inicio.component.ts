import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
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

  key = "data"
  reverse = true
  tituloPost: string
  descTema: string

  constructor(
    private postagemService: PostagemService,
    private authService: AuthService,
    private temaService: TemaService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0, 0)

    if(environment.token == ''){
      this.router.navigate(['/info'])
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
    this.authService.getByIdUser(this.idUser).subscribe((resp: Usuario) => {
      this.user = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  // Método principal
  publicar(){
    // relacionamento entre tabelas Tema e Postagem
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    // relacionamento entre tabelas Usuário e Postagem
    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe({next: (resp: Postagem) => {
      this.postagem = resp

      this.alertas.showAlertSucess('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    }, error: error => {
      if(error || this.link==false){
        this.alertas.showAlertDanger('Ops! Você deixou algum campo incompleto. Preencha todos os campos corretamente, e tente enviar novamente.')
      }
  },})

  }

  findByTema(){

    if(this.tituloPost == ''){
      this.getAllTemas()
    }

    else{
      this.temaService.getByNomeTema(this.descTema).subscribe((resp: Tema[]) => {
      this.listaTemas = resp
      })

    }
  }

  findByTituloPostagem(){

    if(this.tituloPost == ''){
      this.getAllPostagens()
    }

    else{
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
      })

    }
  }

  conteudoLinkDaImagem: string
  linkDaImagemElementWrap: HTMLElement
  linkDaImagemElement: HTMLElement
  link: boolean

  validaLinkDaFoto(event: any) {
          this.conteudoLinkDaImagem = event.target.value

          const regex = /^(ftp|http|https):\/\/[^ "]+$/
          if (regex.test(this.conteudoLinkDaImagem)) {
            if (this.linkDaImagemElement)
                this.linkDaImagemElement.style.display = 'none'

                this.link = false
        } else {
              this.linkDaImagemElementWrap = (<HTMLElement> document.getElementById("validaLinkDaImagem"))
              this.linkDaImagemElementWrap.classList.add("alert", "alert-danger", "w-100")
              this.linkDaImagemElementWrap.innerHTML = '<p id="validacaoLinkDaImagem">Link inválido!</p>'

              this.linkDaImagemElement = (<HTMLElement> document.getElementById("validacaoLinkDaImagem"))

              this.link = true
        }

  }
}
