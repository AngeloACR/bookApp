import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { DbHandlerService } from '../../services/db-handler.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { flatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  id: string;
  endpoint: string;
  name: string;
  title: string;
  fields: string[];
  values: string[];

  clientesFields: string[];
  clientesValues: string[];


  isListarClientes: boolean;
  isCrearClientes: boolean;

  constructor(
    private actRoute: ActivatedRoute,
    private dbHandler: DbHandlerService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.actRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.router.events.subscribe(event => {
      this.actRoute.url.subscribe(value => {
        let url = value[0].path;
        if (url == 'clientes') {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

  ngOnInit() {
    this.isListarClientes = false;
    this.isCrearClientes = false;

    this.clientesValues = this.dbHandler.getLocal('clientesValues');
    this.clientesFields = this.dbHandler.getLocal('clientesFields');


    if (this.id == '0') {
      this.isCrearClientes = true;
      //      this.isEmpresas = false;

      this.initComponent('/clientes/', 'clientes', 'Crear Cliente', this.clientesValues, this.clientesFields);
    } else if (this.id == '1') {
      //      this.isUsers = false;
      this.isListarClientes = true;
      this.initComponent('/clientes/', 'clientes', 'Lista de Clientes', this.clientesValues, this.clientesFields);
    }
  }

  initComponent(endpoint, name, title, values, fields) {
    this.endpoint = endpoint;
    this.name = name;
    this.title = title;
    this.values = values;
    this.fields = fields;
  }

}
