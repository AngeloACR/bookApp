import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { DbHandlerService } from '../../services/db-handler.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { flatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.css']
})
export class TerminosComponent implements OnInit {

  id: string;
  endpoint: string;
  name: string;
  title: string;
  fields: string[];
  values: string[];

  terminosFields: string[];
  terminosValues: string[];


  isCrearTerminos: boolean;
  isListarTerminos: boolean;


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
        if (url == 'terminos') {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

  ngOnInit() {
    this.isCrearTerminos = false;
    this.isListarTerminos = false;
    if (this.id == '0') {
      this.isCrearTerminos = true;
      //      this.isEmpresas = false;

      this.initComponent('/terminos/', 'terminos', 'Crear Terminos y Condiciones', this.terminosValues, this.terminosFields);
    } else if (this.id == '1') {
      //      this.isUsers = false;
      this.isListarTerminos = true;
      this.initComponent('/terminos/', 'terminos', 'Lista de Terminos y Condiciones', this.terminosValues, this.terminosFields);
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
