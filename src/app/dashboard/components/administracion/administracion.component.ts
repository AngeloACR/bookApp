import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { DbHandlerService } from '../../services/db-handler.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { flatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
  id: string;
  endpoint: string;
  title: string;
  forms: string[];
  fields: string[];
  values: string[];
  empresasFields: string[];
  empresasValues: string[];
  usersFields: string[];
  usersValues: string[];
  serviciosFields: string[];
  serviciosValues: string[];
  permisosFields: string[];
  permisosValues: string[];
  name: string;
  addText: string;
  myForm: FormGroup;
  passwordForm: FormGroup;
  empresasForm: FormGroup;
  serviciosForm: FormGroup;
  myInputs: FormArray;
  addForm: boolean;
  showForm: boolean;
  showRow: {};
  showPass: {};
  boxOn: boolean;
  menu: any;
  menuOn: number;
  isUsers: boolean;
  isEmpresas: boolean;
  isServicios: boolean;
  isPermisos: boolean;

  openBox: {};
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
        if (url == 'adm') {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

  ngOnInit() {
    this.setMenu();
    this.isUsers = false;
    this.isEmpresas = false;
    this.isServicios = false;
    this.isPermisos = false;
    this.empresasValues = this.dbHandler.getLocal('empresasValues');
    this.empresasFields = this.dbHandler.getLocal('empresasFields');
    this.serviciosValues = this.dbHandler.getLocal('serviciosValues');
    this.serviciosFields = this.dbHandler.getLocal('serviciosFields');
    this.usersValues = this.dbHandler.getLocal('usersValues');
    this.usersFields = this.dbHandler.getLocal('usersFields');
    this.permisosValues = this.dbHandler.getLocal('permisosValues');
    this.permisosFields = this.dbHandler.getLocal('permisosFields');
    if (this.id == '0') {
      this.isUsers = true;
//      this.isEmpresas = false;

      this.initComponent('/users/all', 'users', 'Administrador de usuarios', 'Agregar usuarios', this.usersValues, this.usersFields);
    } else if (this.id == '1') {
//      this.isUsers = false;
      this.isEmpresas = true;
      this.initComponent('/empresas/', 'empresas', 'Administrador de empresas', 'Agregar empresa', this.empresasValues, this.empresasFields);
    } else if (this.id == '2') {
      this.initComponent('/servicios/all', 'servicios', 'Administrador de servicios', 'Agregar servicio', this.serviciosValues, this.serviciosFields);
      this.isServicios = true;
    } else if (this.id == '3') {
      this.isPermisos = true;
      this.initComponent('/permisos/', 'permisos', 'Administrador de permisos', 'Agregar permiso', this.permisosValues, this.permisosFields);
    }

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
      name: 'Administrar usuarios',
      link: '/adm/0',
      class: {
        menuAct: false
      },
    },
    {
      name: 'Administrar empresas',
      link: '/adm/1',
      class: {
        menuAct: false
      },
    },
    {
      name: 'Administrar servicios',
      link: '/adm/2',
      class: {
        menuAct: false
      },
    },
    {
      name: 'Administrar permisos',
      link: '/adm/3',
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
    this.forms = new Array();
    this.showForm = false;
    this.myInputs = new FormArray([]);
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

    this.passwordForm = new FormGroup({
      nombre: new FormControl(''),
      correo: new FormControl(''),
      usuario: new FormControl(''),
      tipo: new FormControl(''),
      contraseña: new FormControl(''),
      passwordAgain: new FormControl('')
    });

    this.empresasForm = new FormGroup({
      nit: new FormControl(''),
      nombre: new FormControl(''),
//      dueño: new FormControl(''),
      horarios: new FormControl(''),
      telefono: new FormControl(''),
    });

    this.serviciosForm = new FormGroup({
      tipo: new FormControl(''),
      descripcion: new FormControl(''),
      costo: new FormControl(''),
      encargado: new FormControl(''),
      empresa: new FormControl(''),
    });
  }

  initComponent(endpoint, name, title, addText, values, fields) {
    this.endpoint = endpoint;
    this.name = name;
    this.title = title;
    this.addText = addText;
    this.values = values;
    this.fields = fields;
  }
  printId(id: string) {
    return id;
  }

  deleteItem(event, item) {
    var myEnd = this.endpoint;
    if (myEnd.includes('/all')) {
      myEnd = myEnd.replace('/all', '/')
    }
    let functions = [];
    /*     this.dbHandler.deleteSomething(item[0], myEnd)
          .subscribe(data => {   // data is already a JSON object
            this.dbHandler.refreshData(myEnd, this.name);
          }); */
     this.dbHandler.deleteSomething(item, myEnd).pipe(
      flatMap((res1) => this.dbHandler.getSomething(this.endpoint))
    ).subscribe((info) => {
      this.dbHandler.refreshData(info, this.name);
      window.location.reload();
    });

  }

  confirmAdd() {
    var myEnd = this.endpoint;
    let body = {};
    if (myEnd == '/users/all') {
      myEnd = myEnd.replace('/all', '/')
      body['contraseña'] = this.passwordForm.value.password;
    }
    let values = this.myForm.value.myInputs
    let i = 0;
    this.fields.forEach(field => {
      let myField = field.toLowerCase();
      body[myField] = values[i];
      i++;
    });
/*     this.dbHandler.createSomething(body, myEnd)
      .subscribe(data => {   // data is already a JSON object
        this.dbHandler.refreshData(myEnd, this.name);
      });
 */  }

  openForm() {
    this.forms.push('');
    //this.showForm = true;
    this.tBox();

  }

  tBox() {
    this.boxOn = !this.boxOn;
    this.openBox = {
      oBox: this.boxOn
    };
  };

  confirmPass() {
    var myEnd = this.endpoint;
    let body = {};
    if (myEnd.includes('/all')) {
      myEnd = myEnd.replace('/all', '/')
    }
    body = this.passwordForm.value;
    /*     this.dbHandler.createSomething(body, myEnd)
          .subscribe(data => {   // data is already a JSON object
            this.dbHandler.refreshData(myEnd, this.name);
          });
     */
    this.dbHandler.createSomething(body, myEnd).pipe(
      flatMap((res1) => this.dbHandler.getSomething(this.endpoint))
    ).subscribe((info) => {
      console.log(info);
      this.tBox();
      if (info['status']) {
        this.dbHandler.refreshData(info, this.name);
      window.location.reload();
      }
    });

  };

  confirmEmp() {
    var myEnd = this.endpoint;
    let body = {};

    body = this.empresasForm.value;
    /*     this.dbHandler.createSomething(body, myEnd)
          .subscribe(data => {   // data is already a JSON object
            this.dbHandler.refreshData(myEnd, this.name);
          });
     */
    body['dueño'] = 1;
    this.dbHandler.createSomething(body, myEnd).pipe(
      flatMap((res1) => this.dbHandler.getSomething(this.endpoint))
    ).subscribe((info) => {
      this.tBox();
      if (info['status']) {
        this.dbHandler.refreshData(info, this.name);
      window.location.reload();
      }
    });

  };


  confirmSer() {
    var myEnd = this.endpoint;
    let body = {};

    body = this.serviciosForm.value;
    /*     this.dbHandler.createSomething(body, myEnd)
          .subscribe(data => {   // data is already a JSON object
            this.dbHandler.refreshData(myEnd, this.name);
          });
     */
    if (myEnd.includes('/all')) {
      myEnd = myEnd.replace('/all', '/')
    }
    this.dbHandler.createSomething(body, myEnd).pipe(
      flatMap((res1) => this.dbHandler.getSomething(this.endpoint))
    ).subscribe((info) => {
      console.log(info);
      this.tBox();
      if (info['status']) {
        this.dbHandler.refreshData(info, this.name);
      window.location.reload();
      }
    });

  };

  toggleMenu(event, item, id) {
    let link = item.link;
    this.router.navigateByUrl(link);
  }


}
