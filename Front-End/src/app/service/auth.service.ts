import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(

    private http: HttpClient

    ) { }

    token ={
      headers: new HttpHeaders().set('Authorization', environment.token)
    }

    refreshToken(){

      this.token ={
        headers: new HttpHeaders().set('Authorization', environment.token)
      }
    }

    login(usuarioLogin: UsuarioLogin): Observable <UsuarioLogin>{
      return this.http.post<UsuarioLogin>("https://infokidsgen.herokuapp.com/usuarios/logar", usuarioLogin)
    }

    cadastrar(usuario: Usuario): Observable <Usuario>{
      return this.http.post<Usuario>("https://infokidsgen.herokuapp.com/usuarios/cadastrar", usuario)

    }

    atualizar(usuario: Usuario): Observable <Usuario>{
      return this.http.put<Usuario>("https://infokidsgen.herokuapp.com/usuarios/atualizar", usuario, this.token)
      
    }

    getByIdUser(id: number): Observable<Usuario>{
      return this.http.get<Usuario>(`https://infokidsgen.herokuapp.com/usuarios/${id}`, this.token)
    }

    logado(){
      let ok: boolean = false
  
      if(environment.token != ''){
        ok = true
      }
  
      return ok
    }

}
