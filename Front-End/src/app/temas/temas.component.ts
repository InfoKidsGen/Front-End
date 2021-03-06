import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  tema: Tema = new Tema()
  listaTemas: Tema[]

  ngOnInit(){
    window.scroll(0, 0)

    if(environment.token == ''){
      this.router.navigate(['/login'])
    }

    this.findAllTemas()
  }

  findAllTemas(){
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe({ next: (resp: Tema) => {
      this.tema = resp;

      this.alertas.showAlertSucess("Tema cadastrado com sucesso!")
      this.findAllTemas()
      this.tema = new Tema()
    }, error: error => {
        if(error) {
          this.alertas.showAlertDanger('Um ou mais campos estão incompletos! Favor preencher todos os campos e enviar novamente')
        }
    }})
  }

}
