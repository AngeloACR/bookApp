import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { DbHandlerService } from '../../services/db-handler.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { flatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html',
  styleUrls: ['./soporte.component.css']
})
export class SoporteComponent implements OnInit {

  id: string;
  endpoint: string;
  name: string;
  title: string;
  fields: string[];
  values: string[];

  soporteFields: string[];
  soporteValues: string[];

  isCrearAyuda: boolean;
  isListarAyuda: boolean;


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
        if (url == 'soporte') {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

  ngOnInit() {
    this.isCrearAyuda = false;
    this.isListarAyuda = false;
    if (this.id == '0') {
      this.isCrearAyuda = true;
      //      this.isEmpresas = false;

      this.initComponent('/soporte/', 'soporte', 'Crear Ayuda', this.soporteValues, this.soporteFields);
    } else if (this.id == '1') {
      //      this.isUsers = false;
      this.isListarAyuda = true;
      this.initComponent('/soporte/', 'soporte', 'Lista de Ayuda', this.soporteValues, this.soporteFields);
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
