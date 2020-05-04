import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { DbHandlerService } from '../../services/db-handler.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { flatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.css']
})
export class PromosComponent implements OnInit {

  id: string;
  endpoint: string;
  name: string;
  title: string;
  fields: string[];
  values: string[];

  promoFields: string[];
  promoValues: string[];


  isCrearPromo: boolean;
  isListarPromo: boolean;
  isCrearPromoDestacadas: boolean;
  isListarPromoDestacadas: boolean;


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
        if (url == 'promo') {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

  ngOnInit() {
    this.isCrearPromo = false;
    this.isListarPromo = false;
    this.isCrearPromoDestacadas = false;
    this.isListarPromoDestacadas = false;

    if (this.id == '0') {
      this.isCrearPromo = true;
      //      this.isEmpresas = false;

      this.initComponent('/promo/', 'promo', 'Crear Promoción', this.promoValues, this.promoFields);
    } else if (this.id == '1') {
      //      this.isUsers = false;
      this.isListarPromo = true;
      this.initComponent('/promo/', 'promo', 'Lista de Promociones', this.promoValues, this.promoFields);
    } else if (this.id == '2') {
      this.isCrearPromoDestacadas = true;
      //      this.isEmpresas = false;

      this.initComponent('/promo/', 'promo', 'Crear Promoción Destacada', this.promoValues, this.promoFields);
    } else if (this.id == '3') {
      //      this.isUsers = false;
      this.isListarPromoDestacadas = true;
      this.initComponent('/promo/', 'promo', 'Lista de Promociones Destacadas', this.promoValues, this.promoFields);
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
