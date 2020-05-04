import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { DbHandlerService } from '../../services/db-handler.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { flatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  id: string;
  endpoint: string;
  name: string;
  title: string;
  fields: string[];
  values: string[];

  isCrearNotifSucursal: boolean;
  isListarNotifSucursal: boolean;
  isCrearNotifAdmin: boolean;
  isListarNotifAdmin: boolean;

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
        if (url == 'notificaciones') {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

  ngOnInit() {
    this.isCrearNotifSucursal = false;
    this.isListarNotifSucursal = false;
    this.isCrearNotifAdmin = false;
    this.isListarNotifAdmin = false;

  }

  initComponent(endpoint, name, title, values, fields) {
    this.endpoint = endpoint;
    this.name = name;
    this.title = title;
    this.values = values;
    this.fields = fields;
  }

}
