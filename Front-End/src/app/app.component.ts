import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import * as $ from 'jquery'
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  usuario = {
    id: 0,
    nome : '',
    foto : ''
  }

  constructor(
    public authService: AuthService,
    private router: Router

  ){

  }

  ngOnInit(){
    window.scroll(0, 0)
  }

  // Togle menu lateral
  toggle(){
    $('#sidebar').toggleClass('active');
  }

  // Função que busca os dados do usuário e insere no menu lateral.
  usuarioLogado(){
    if(environment.token != ''){
      
      this.usuario.id = environment.id
      this.usuario.nome = environment.nomeCompleto
      this.usuario.foto = environment.foto

      $('#nameUser').html(this.usuario.nome);
      $('#user').css("background-image", "url(" + this.usuario.foto + ")");
    }
  }

  sair(){

    environment.token= ''
    environment.foto= ''
    environment.id= 0
    environment.nomeCompleto= ''

    this.router.navigate(['/login'])
    }
}
