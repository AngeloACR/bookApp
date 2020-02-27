import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DbHandlerService } from '../../dashboard/services/db-handler.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;

  constructor(
    private auth: AuthService,
    private dbHandler: DbHandlerService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.login = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });

  }

  logUser() {
    var data = this.login.value;
    this.auth.login(data).subscribe((logData: any) => {
      if (logData.auth) {
        this.auth.storeData(logData);
        this.actualizar();
        this.router.navigateByUrl('/');
      }
    });
  }

  actualizar() {
    let refreshList = [
      {
        endpoint: '/users/all',
        name: 'users'
      },
      {
        endpoint: '/empresas/all',
        name: 'empresas'
      },
      {
        endpoint: '/reservas/all',
        name: 'reservas'
      },
      {
        endpoint: '/servicios/all',
        name: 'servicios'
      }
    ]
    let dataArray = [];
    refreshList.forEach(element => {
      dataArray.push(this.dbHandler.getSomething(element.endpoint));
    });
    //    this.dbHandler.getSomething('/users/all').subscribe(info => {
    forkJoin(dataArray).subscribe(info => {
      let i = 0;
      refreshList.forEach(element => {
        console.log(element);
        this.dbHandler.refreshData(info[i], element.name);
        i++;
      });
    });

  }

  flush() {
    this.login.setValue({
      username: '',
      password: ''
    });
  }
  registro(evento, tipo) {
    this.router.navigateByUrl('/registro');
  }
}
