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

    console.log(this.formOk)
    if(this.nome&&this.tipo&&this.email&&this.senhaLonga&&this.senhaIgual){
        this.formOk = true
      } else {
        this.formOk = false
      }
      console.log(this.formOk)
    if (this.formOk==false){
      this.alertas.showAlertInfo("Favor preencher todos os campos!")
    }
    else{
      //Foto Padrão:

      if(this.link==false){
        this.usuario.foto = 'https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-366-456318-512.png'
       }

      this.authService.cadastrar(this.usuario).subscribe((resp:Usuario) => {
        this.usuario=resp
          this.router.navigate(['/info'])
            this.alertas.showAlertSucess("Usuario cadastrado com sucesso!")
      })
    }
  }

// VALIDAÇÃO DE FORMULÁRIO:

//Variáveis

conteudoTipo: string
conteudoEmail: string
conteudoSenha2: string
conteudoNome: string
conteudoLinkDaImagem: string

tipoElementWrap: HTMLElement
emailElementWrap: HTMLElement
senha1ElementWrap: HTMLElement
senha2ElementWrap: HTMLElement
nomeElementWrap: HTMLElement
linkDaImagemElementWrap: HTMLElement

tipoElement: HTMLElement
emailElement: HTMLElement
senha1Element: HTMLElement
senha2Element: HTMLElement
nomeElement: HTMLElement
linkDaImagemElement: HTMLElement


formOk: boolean = false
nome: boolean = false
tipo: boolean = false
email: boolean = false
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

  validaEmail(event: any) {
    this.conteudoEmail = event.target.value
    console.log(this.conteudoEmail)

    const regex = /\S+@\S+\.\S+/
    if (regex.test(this.conteudoEmail)) {
      if (this.emailElement)
          this.emailElement.style.display = 'none'


      this.email=true
  } else {
        this.emailElementWrap = (<HTMLElement> document.getElementById("validaEmail"))
        this.emailElementWrap.innerHTML = '<p id="validacaoEmail">Link Inválido</p>'

        this.emailElement = (<HTMLElement> document.getElementById("validacaoEmail"))

        this.emailElement.style.display = 'inline-block'
        this.email=false
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
        console.log(this.conteudoSenha2)
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
            this.linkDaImagemElementWrap.innerHTML = '<p id="validacaoLinkDaImagem">Link inválido! Inválido</p>'

            this.linkDaImagemElement = (<HTMLElement> document.getElementById("validacaoLinkDaImagem"))

            this.linkDaImagemElement.style.display = 'inline-block'
            this.link=false
      }
          }
}

