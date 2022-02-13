import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem= new Postagem()
  tema: Tema= new Tema()
  listaTemas: Tema[]
  idTema: number


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private alertas: AlertasService

  ) { }

  ngOnInit(){

    window.scroll (0,0)
    if(environment.token == ''){
      this.router.navigate(['/login'])
    }
    let id = this.route.snapshot.params['id']
    this.findByIdPostagem(id)
    this.findAllTemas()
  }

    findAllTemas(){
      this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
        this.listaTemas = resp

      })
    }

    findByIdPostagem(
      id: number
    ){
      this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
        this.postagem = resp

      })
    }

    findByIdTema(){

      this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
          this.tema = resp
        })
    }

    // Método Principal
    atualizar(){

      this.tema.id = this.idTema
      this.postagem.tema = this.tema

      this.postagemService.putPostagem(this.postagem).subscribe({ next: (resp: Postagem) => {
        this.postagem = resp
        this.alertas.showAlertSucess("Postagem atualizada com sucesso!")
        this.router.navigate(['/inicio'])
      }, error:error =>{
        if(error || this.link==false) {this.alertas.showAlertDanger('Ops! Você deixou algum campo incompleto. Preencha todos os campos corretamente, e tente enviar novamente.')}
      }})
    }

// Validação regex de link de foto

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
