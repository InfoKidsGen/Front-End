import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'infokids';

  constructor(
    public authService: AuthService
  ){

  }

  ngOnInit(){
    window.scroll(0, 0)
  }
}
