import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { DbHandlerService } from '../../services/db-handler.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { flatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.css']
})
export class DirectorioComponent implements OnInit {
  fields: string[];
  values: string[];
  name: string;
  users: any[];
  formValue: any;
  openBox: {};
  showPass: {};
  boxOn: boolean;
  show: boolean;
  endpoint: string;
  type: string;
  localstorage: string;
  title: string;

  serviciosFields: string[];
  serviciosValues: string[];
  reservasFields: string[];
  reservasValues: string[];

  id: string;
  forms: string[];
  addText: string;
  myForm: FormGroup;
  reservaForm: FormGroup;
  myInputs: FormArray;
  addForm: boolean;
  showForm: boolean;
  showRow: {};
  isReservar= false;
  isVer= false;

  menu: any;
  menuOn: number;

  constructor(
    private dbHandler: DbHandlerService,
    private fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    this.actRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.router.events.subscribe(event => {
      this.actRoute.url.subscribe(value => {
        let url = value[0].path;
        if (url == 'agenda') {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

  ngOnInit() {
    this.setMenu()
    this.name = 'users';

    this.users = [];
    this.users.push({
      name: 'Angelo Crincoli',
      speciality: 'Urologo',
      experience: '5 años'
    });

    this.users.push({
      name: 'Angelo Crincoli',
      speciality: 'Urologo',
      experience: '5 años'
    });

    this.users.push({
      name: 'Angelo Crincoli',
      speciality: 'Urologo',
      experience: '5 años'
    });

    this.values = [];

    this.serviciosValues = this.dbHandler.getLocal('serviciosValues');
    this.serviciosFields = this.dbHandler.getLocal('serviciosFields');

    this.reservasValues = this.dbHandler.getLocal('reservasValues');
    this.reservasFields = this.dbHandler.getLocal('reservasFields');

    if (this.id == '0') {
      this.isVer = false;
      this.initComponent('/servicios/', 'servicios', this.serviciosValues, this.serviciosFields)
      if(this.values && this.values.length){
        this.isReservar = true;
      } else{
        this.isReservar = false;
      }
    } else if (this.id == '1') {
      this.isReservar = false;
      this.initComponent('/reservas/', 'reservas', this.reservasValues, this.reservasFields)
      if(this.values && this.values.length){
        this.isVer = true;
      } else{
        this.isVer = false;
      }
    }
    this.boxOn = false;
    this.initForm();
    this.showRow = {
      showRow: false
    };
    this.openBox = {
      openBox: false
    };

  }

  setMenu() {
    this.menu = [{
      name: 'Lista de servicios',
      link: '/agenda/0',
      class: {
        menuAct: false
      },
    },
    {
      name: 'Mis reservaciones',
      link: '/agenda/1',
      class: {
        menuAct: false
      },
    }];
    this.menuOn = +this.id;
    this.menu[this.menuOn].class = {
      menuAct: true
    };
  }
  
  initForm() {
    this.showForm = false;
    this.myInputs = new FormArray([]);
    this.forms = new Array();
    let aux = {};
    this.fields.forEach(field => {
      this.myInputs.push(new FormControl(''));
    });
    this.showRow = {
      showRow: false
    };
    this.myForm = new FormGroup({
      myInputs: this.myInputs,
    });

    this.reservaForm = new FormGroup({
      info: new FormControl(''),
      fecha: new FormControl(''),
      hora: new FormControl('')
    });

/*     this.myForm = new FormGroup(aux);
 */}


  initComponent(endpoint, name, values, fields) {
    this.endpoint = endpoint;
    this.name = name;
    this.values = values;
    this.fields = fields;
  }
  printId(id: string) {
    return id;
  }

  deleteItem(event, item) {
    var myEnd = this.endpoint;
    if (myEnd == '/users/all') {
      myEnd = myEnd.replace('/all', '/')
    }
    this.dbHandler.deleteSomething(item, myEnd).pipe(
      flatMap((res1) => this.dbHandler.getSomething(myEnd))
    ).subscribe((info) => {
      this.dbHandler.refreshData(info, this.name)
      window.location.reload();
    });
  }

  confirmReserva() {
    var myEnd = '/reservas/';
    var name = 'reservas'

    let body = this.reservaForm.value
    body['servicio'] = this.formValue.ref;
    let i = 0;

     this.dbHandler.createSomething(body, myEnd).pipe(
      flatMap((res1) => this.dbHandler.getSomething(myEnd))
    ).subscribe((info) => {
      this.dbHandler.refreshData(info, name)
      window.location.reload();
    });
  }

 openForm(event, value) {
/*   this.forms.push('');
  this.showForm = true;
  this.showRow = {
    showRow: true
  };
 */
  this.formValue = value
  this.tBox();

}

toggleMenu(event, item, id) {
  let link = item.link;
  this.router.navigateByUrl(link);
}

tBox() {
  this.boxOn = !this.boxOn;
  this.openBox = {
    oBox: this.boxOn
  };
};

openInfo() {
};


}
