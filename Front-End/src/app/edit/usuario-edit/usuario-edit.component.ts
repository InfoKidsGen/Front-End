import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
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
    private route: ActivatedRoute,
    private alertas: AlertasService

  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == ''){
    this.router.navigate(['/login'])}
    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)

    this.usuario.senha = ''
  }

  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: Usuario) => {
    this.usuario = resp

    resp.senha = ''
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

    if(this.nome&&this.tipo&&this.senhaLonga&&this.senhaIgual){
      this.formOk = true
    } else {
      this.formOk = false
    }

    if (this.formOk==false) {
      this.alertas.showAlertInfo("Favor preencher todos os campos corretamente!")
    }
    else {

      //Foto Padrão:

      if(this.link==false){
        this.usuario.foto = 'https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-366-456318-512.png'
       }

       // Atualizar:

      this.authService.atualizar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/login'])
        this.alertas.showAlertSucess("Usuario atualizado com sucesso, realize o login novamente! ")

          environment.token= ''
          environment.foto= ''
          environment.id= 0
          environment.nomeCompleto= ''
      })
    }
  }

  // VALIDAÇÃO DE FORMULÁRIO:

//Variáveis

conteudoTipo: string
conteudoSenha2: string
conteudoNome: string
conteudoLinkDaImagem: string

tipoElementWrap: HTMLElement
senha1ElementWrap: HTMLElement
senha2ElementWrap: HTMLElement
nomeElementWrap: HTMLElement
linkDaImagemElementWrap: HTMLElement

tipoElement: HTMLElement
senha1Element: HTMLElement
senha2Element: HTMLElement
nomeElement: HTMLElement
linkDaImagemElement: HTMLElement


formOk: boolean = false
nome: boolean = false
tipo: boolean = false
senhaLonga: boolean = false
senhaIgual: boolean = false
link: boolean = false



//Funções

  validaTipo(event: any){
    this.conteudoTipo = event.target.value

    if(this.conteudoTipo=="1"||this.conteudoTipo=="2"||this.conteudoTipo=="3") {
      if(this.tipoElement)
      this.tipoElement.style.display = 'none'

      this.tipo = true
    } else {
      this.tipoElementWrap = (<HTMLElement> document.getElementById("validaTipo"))
      this.tipoElementWrap.innerHTML = '<p id="validacaoTipo">Preencha o tipo de usuário</p>'

      this.tipoElement = (<HTMLElement> document.getElementById("validacaoTipo"))
      this.tipoElement.style.display = 'inline-block'

      this.tipo=false
    }
  }

  validaNome(event: any){
  this.conteudoNome = event.target.value
  if(this.conteudoNome!=''){
    if(this.nomeElement)
      this.nomeElement.style.display ='none'

      this.nome=true
    } else {
      this.nomeElementWrap = (<HTMLElement> document.getElementById("validaNome"))
      this.nomeElementWrap.innerHTML = '<p id="validacaoNome">Nome Inválido</p>'


      this.nomeElement = (<HTMLElement> document.getElementById("validacaoNome"))
      this.nomeElement.style.display = 'inline-block'
      this.nome=false
    }


  }

      validaSenha1(event:any){
        this.confirmarSenha = event.target.value
        if(this.confirmarSenha.length>6){
          if(this.senha1Element)
            this.senha1Element.style.display ='none'

            this.senhaLonga=true
          } else {
            this.senha1ElementWrap = (<HTMLElement> document.getElementById("validaSenha1"))
            this.senha1ElementWrap.innerHTML = '<p id="validacaoSenha1">Senha muito curta</p>'


            this.senha1Element = (<HTMLElement> document.getElementById("validacaoSenha1"))
            this.senha1Element.style.display = 'inline-block'
            this.senhaLonga=false

        }
      }

      validaSenha2(event:any){
        this.conteudoSenha2 = event.target.value

        if(this.conteudoSenha2==this.confirmarSenha){
          if(this.senha2Element)
            this.senha2Element.style.display ='none'

            this.senhaIgual=true
          } else {
            this.senha2ElementWrap = (<HTMLElement> document.getElementById("validaSenha2"))
            this.senha2ElementWrap.innerHTML = '<p id="validacaoSenha2">As senhas não coincidem!</p>'


            this.senha2Element = (<HTMLElement> document.getElementById("validacaoSenha2"))
            this.senha2Element.style.display = 'inline-block'
            this.senhaIgual=false

        }
      }

      validaLinkDaImagem(event: any) {
        this.conteudoLinkDaImagem = event.target.value

        const regex = /^(ftp|http|https):\/\/[^ "]+$/
        if (regex.test(this.conteudoLinkDaImagem)) {
          if (this.linkDaImagemElement)
              this.linkDaImagemElement.style.display = 'none'


          this.link=true
        } else {
            this.linkDaImagemElementWrap = (<HTMLElement> document.getElementById("validaLinkDaImagem"))
            this.linkDaImagemElementWrap.innerHTML = '<p id="validacaoLinkDaImagem">Link inválido!</p>'

            this.linkDaImagemElement = (<HTMLElement> document.getElementById("validacaoLinkDaImagem"))

            this.linkDaImagemElement.style.display = 'inline-block'
            this.link=false
        }
      }

}
