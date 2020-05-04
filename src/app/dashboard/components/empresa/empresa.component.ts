import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { DbHandlerService } from '../../services/db-handler.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { flatMap } from 'rxjs/operators';
import { FileValidator } from '../../../directives/fileValidator';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  id: string;
  endpoint: string;
  title: string;
  forms: string[];
  fields: string[];
  values: string[];
  name: string;
  sucursalesFields: string[];
  sucursalesValues: string[];
  empresasFields: string[];
  empresasValues: string[];
  empleadosFields: string[];
  empleadosValues: string[];
  serviciosFields: string[];
  serviciosValues: string[];
  myInputs: FormArray;
  addForm: boolean;
  showForm: boolean;
  showRow: {};
  showPass: {};
  boxOn: boolean;
  menu: any;
  menuOn: number;
  isListarSucursales: boolean;
  isCrearSucursales: boolean;
  isCrearServicios: boolean;
  isListarServicios: boolean;
  isCrearEmpleados: boolean;
  isListarEmpleados: boolean;
  isCrearServiciosAdmin: boolean;
  isListarServiciosAdmin: boolean;
  isCrearEmpleadosAdmin: boolean;
  isListarEmpleadosAdmin: boolean;
  isCrearSucursalesAdmin: boolean;
  isListarSucursalesAdmin: boolean;
  isCrearEmpresas: boolean;
  isListarEmpresas: boolean;
  openBox: {};

  registroSucursal: FormGroup;
  registroSucursal2: FormGroup;
  registroHorario: FormGroup;
  registroEmpleado: FormGroup;
  registroMedico: FormGroup;
  registroCancha: FormGroup;
  registroPeluqueria: FormGroup;
  registroRestaurant: FormGroup;
  tipoServicioP: FormArray;
  tipoServicioR: FormArray;
  tipoServicioM: FormArray;
  tipoServicioC: FormArray;
  nombreEncargado: FormArray;

  user: String;
  password: String;

  nCanchas: FormArray;
  precioCanchas: FormArray;

  duracionP: FormArray;
  duracionR: FormArray;

  descripcionP: FormArray;
  descripcionR: FormArray;

  precioServicioP: FormArray;
  precioServicioR: FormArray;

  fileName1: String;
  fileName2: String;
  fileName3: String;


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
        if (url == 'empresa') {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

  ngOnInit() {
    this.isCrearSucursales = false;
    this.isListarSucursales = false;
    this.isCrearServicios = false;
    this.isListarServicios = false;
    this.isCrearEmpleados = false;
    this.isListarEmpleados = false;
    this.isCrearServiciosAdmin = false;
    this.isListarServiciosAdmin = false;
    this.isCrearEmpleadosAdmin = false;
    this.isListarEmpleadosAdmin = false;
    this.isCrearSucursalesAdmin = false;
    this.isListarSucursalesAdmin = false;
    this.isCrearEmpresas = false;
    this.isListarEmpresas = false;

    this.sucursalesValues = this.dbHandler.getLocal('sucursalesValues');
    this.sucursalesFields = this.dbHandler.getLocal('sucursalesFields');
    this.empresasValues = this.dbHandler.getLocal('empresasValues');
    this.empresasFields = this.dbHandler.getLocal('empresasFields');
    this.serviciosValues = this.dbHandler.getLocal('serviciosValues');
    this.serviciosFields = this.dbHandler.getLocal('serviciosFields');
    this.empleadosValues = this.dbHandler.getLocal('empleadosValues');
    this.empleadosFields = this.dbHandler.getLocal('empleadosFields');
    if (this.id == '0') {
      this.isCrearSucursales = true;

      this.initComponent('/empresas/', 'sucursales', 'Crear Sucursal', this.sucursalesValues, this.sucursalesFields);
    } else if (this.id == '1') {
      //      this.isUsers = false;
      this.isListarSucursales = true;
      this.initComponent('/empresas/', 'sucursales', 'Lista de Sucursales', this.sucursalesValues, this.sucursalesFields);
    } else if (this.id == '2') {
      this.isCrearEmpleados = true;
      this.initComponent('/empresas/', 'empleados', 'Crear Empleado/Profesional', this.empleadosValues, this.empleadosFields);
    } else if (this.id == '3') {
      this.isListarEmpleados = true;
      this.initComponent('/empresas/', 'empleados', 'Lista de Empleados/Profesionales', this.empleadosValues, this.empleadosFields);
    } else if (this.id == '4') {
      this.isCrearServicios = true;
      this.initComponent('/empresas/', 'servicios', 'Crear Servicio', this.serviciosValues, this.serviciosFields);
    } else if (this.id == '5') {
      this.isListarServicios = true;
      this.initComponent('/empresas/', 'servicios', 'Lista de Servicios', this.serviciosValues, this.serviciosFields);
    } else if (this.id == '6') {
      this.isCrearEmpresas = true;
      this.initComponent('/empresas/', 'empresas', 'Crear Empresa', this.empresasValues, this.empresasFields);
    } else if (this.id == '7') {
      this.isListarEmpresas = true;
      this.initComponent('/empresas/', 'empresas', 'Lista de Empresas', this.empresasValues, this.empresasFields);
    } else if (this.id == '8') {
      this.isCrearSucursalesAdmin = true;
      this.initComponent('/empresas/', 'sucursales', 'Crear sucursal', this.sucursalesValues, this.sucursalesFields);
    } else if (this.id == '9') {
      this.isListarSucursalesAdmin = true;
      this.initComponent('/empresas/', 'sucursales', 'Lista de Sucursales', this.sucursalesValues, this.sucursalesFields);
    } else if (this.id == '10') {
      this.isCrearEmpleadosAdmin = true;
      this.initComponent('/empresas/', 'empleados', 'Crear Empleado', this.empleadosValues, this.empleadosFields);
    } else if (this.id == '11') {
      this.isListarEmpleadosAdmin = true;
      this.initComponent('/empresas/', 'empleados', 'Lista de Empleados', this.empleadosValues, this.empleadosFields);
    } else if (this.id == '12') {
      this.isCrearServiciosAdmin = true;
      this.initComponent('/empresas/', 'servicios', 'Crear Servicio', this.serviciosValues, this.serviciosFields);
    } else if (this.id == '13') {
      this.isListarServiciosAdmin = true;
      this.initComponent('/empresas/', 'servicios', 'Lista de Servicios', this.serviciosValues, this.serviciosFields);
    }

    this.initForm();
    /*this.showRow = {
      showRow: false
    };
    this.openBox = {
      openBox: false
    };
 */
  }


  /*   setMenu() {
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
    } */

  initForm() {

    this.registroSucursal = new FormGroup({
      nombreEmpresa: new FormControl(''),
      nit: new FormControl(''),
      direccion: new FormControl(''),
      estado: new FormControl(''),
      pais: new FormControl(''),
      zona: new FormControl(''),
      ciudad: new FormControl(''),
      tlf1: new FormControl(''),
      tlf2: new FormControl(''),
    });

    this.registroSucursal2 = new FormGroup({
      descripcion: new FormControl(''),
      nombreBanco: new FormControl(''),
      numeroBanco: new FormControl(''),
      tipoCuenta: new FormControl(''),
      encargado: new FormControl(''),
      imagen1: new FormControl('', [FileValidator.validate]),
      imagen2: new FormControl('', [FileValidator.validate]),
      imagen3: new FormControl('', [FileValidator.validate]),
      valorConsulta: new FormControl(''),
      pagoEnEstablecimiento: new FormControl(''),
      pagoOnline: new FormControl(''),
      reservaGratis: new FormControl(''),
    });



    this.tipoServicioP = new FormArray([]);
    this.duracionP = new FormArray([]);
    this.descripcionP = new FormArray([]);
    this.precioServicioP = new FormArray([]);

    this.tipoServicioP.push(new FormControl(''));
    this.duracionP.push(new FormControl(''));
    this.descripcionP.push(new FormControl(''));
    this.precioServicioP.push(new FormControl(''));

    this.registroPeluqueria = new FormGroup({
      tipoServicioP: this.tipoServicioP,
      duracionP: this.duracionP,
      descripcionP: this.descripcionP,
      precioServicioP: this.precioServicioP,
      horasAntelacion: new FormControl(''),
    });

    this.tipoServicioR = new FormArray([]);
    this.duracionR = new FormArray([]);
    this.descripcionR = new FormArray([]);
    this.precioServicioR = new FormArray([]);

    this.tipoServicioR.push(new FormControl(''));
    this.duracionR.push(new FormControl(''));
    this.descripcionR.push(new FormControl(''));
    this.precioServicioR.push(new FormControl(''));

    this.registroRestaurant = new FormGroup({
      tipoServicioR: this.tipoServicioR,
      duracionR: this.duracionR,
      descripcionR: this.descripcionR,
      precioServicioR: this.precioServicioR,
      horasAntelacion: new FormControl(''),
      nMesas: new FormControl(''),
    });

    this.tipoServicioC = new FormArray([]);
    this.nCanchas = new FormArray([]);
    this.precioCanchas = new FormArray([]);

    this.registroCancha = new FormGroup({
      futbol5: new FormControl(''),
      futbol8: new FormControl(''),
      futbol9: new FormControl(''),
      futbol11: new FormControl(''),
      nCanchas5: new FormControl(''),
      nCanchas8: new FormControl(''),
      nCanchas9: new FormControl(''),
      nCanchas11: new FormControl(''),
      tiempo: new FormControl(''),
      horasAntelacion: new FormControl(''),
      precioCanchas5: new FormControl(''),
      precioCanchas8: new FormControl(''),
      precioCanchas9: new FormControl(''),
      precioCanchas11: new FormControl(''),
      tipoServicioC: this.tipoServicioC,
      nCanchas: this.nCanchas,
      precioCanchas: this.precioCanchas
    });

    this.tipoServicioM = new FormArray([]);
    this.nombreEncargado = new FormArray([]);

    this.tipoServicioM.push(new FormControl(''));
    this.nombreEncargado.push(new FormControl(''));

    this.registroMedico = new FormGroup({
      tiempoInicial: new FormControl(''),
      horasAntelacion: new FormControl(''),
      tipoServicioM: this.tipoServicioM,
      nombreEncargado: this.nombreEncargado,
    });

    this.registroHorario = new FormGroup({
      lunes: new FormControl(''),
      martes: new FormControl(''),
      miercoles: new FormControl(''),
      jueves: new FormControl(''),
      viernes: new FormControl(''),
      sabado: new FormControl(''),
      domingo: new FormControl(''),
      aperturalunes: new FormControl(''),
      aperturamartes: new FormControl(''),
      aperturamiercoles: new FormControl(''),
      aperturajueves: new FormControl(''),
      aperturaviernes: new FormControl(''),
      aperturasabado: new FormControl(''),
      aperturadomingo: new FormControl(''),
      cierrelunes: new FormControl(''),
      cierremartes: new FormControl(''),
      cierremiercoles: new FormControl(''),
      cierrejueves: new FormControl(''),
      cierreviernes: new FormControl(''),
      cierresabado: new FormControl(''),
      cierredomingo: new FormControl(''),
    });
  }

  initComponent(endpoint, name, title, values, fields) {
    this.endpoint = endpoint;
    this.name = name;
    this.title = title;
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
  toggleMenu(event, item, id) {
    let link = item.link;
    this.router.navigateByUrl(link);
  }


}
