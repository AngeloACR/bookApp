import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DbHandlerService } from '../../dashboard/services/db-handler.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { FileValidator } from '../../directives/fileValidator';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroUser: FormGroup;
  registroEmpresa: FormGroup;
  registroEmpresa2: FormGroup;
  registroTerminos: FormGroup;
  registroHorario: FormGroup;
  registroMedico: FormGroup;
  registroCancha: FormGroup;
  registroPeluqueria: FormGroup;
  registroRestaurant: FormGroup;

  messageTitle: String;
  messageContent: String;
  messageButton: String;

  formCompleted: Boolean;
  formSelected: Boolean;
  isMedico: Boolean;
  isCancha: Boolean;
  isPeluqueria: Boolean;
  isRestaurant: Boolean;
  selectedImg: String;
  showForm: {};
  showBlack: {};
  endForm: {};
  hideOption: {};
  salonImg: String;
  restImg: String;
  canchasImg: String;
  mediImg: String;
  tipoSelected: String;

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
    private auth: AuthService,
    private dbHandler: DbHandlerService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForms();

    this.salonImg = "assets/form/SALABELLEZA.png";
    this.restImg = "assets/form/RESTAURANTE.png";
    this.canchasImg = "assets/form/CANCHAS.png";
    this.mediImg = "assets/form/CITASMEDI.png";

    this.formCompleted = false;
    this.formSelected = false;
    this.isMedico = false;
    this.isCancha = false;
    this.isPeluqueria = false;
    this.isRestaurant = false;
  }

  initForms() {

    this.showForm = {
      formAct: false
    }
    this.showBlack = {
      blackAct: false
    }
    this.hideOption = {
      hideOption: false
    }
    this.endForm = {
      endForm: false
    }

    this.registroEmpresa = new FormGroup({
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

    this.registroEmpresa2 = new FormGroup({
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

    this.registroTerminos = new FormGroup({
      aceptarTerminos: new FormControl(''),
    });

    this.registroUser = new FormGroup({
      username: new FormControl(''),
      mail: new FormControl(''),
      password: new FormControl(''),
      cpassword: new FormControl(''),
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

  toggleForm(event, tipo) {
    this.formSelected = true;

    switch (tipo) {
      case 'salon':
        this.isMedico = false;
        this.isCancha = false;
        this.isPeluqueria = true;
        this.isRestaurant = false;
        this.selectedImg = this.salonImg;
        break;
      case 'rest':
        this.isMedico = false;
        this.isCancha = false;
        this.isPeluqueria = false;
        this.isRestaurant = true;
        this.selectedImg = this.restImg;
        break;
      case 'canchas':
        this.isMedico = false;
        this.isCancha = true;
        this.isPeluqueria = false;
        this.isRestaurant = false;
        this.selectedImg = this.canchasImg;
        break;
      case 'medi':
        this.isMedico = true;
        this.isCancha = false;
        this.isPeluqueria = false;
        this.isRestaurant = false;
        this.selectedImg = this.mediImg;
        break;

      default:
        break;
    }
    this.tipoSelected = tipo;
    this.showForm = {
      formAct: true
    }
    this.showBlack = {
      blackAct: true
    }

    this.hideOption = {
      hideOption: true
    }
  }

  addSomething() {
    let tipo = this.tipoSelected;
    switch (tipo) {
      case 'salon':
        this.tipoServicioP.push(new FormControl(''));
        this.duracionP.push(new FormControl(''));
        this.descripcionP.push(new FormControl(''));
        this.precioServicioP.push(new FormControl(''));
        break;
      case 'rest':
        this.tipoServicioR.push(new FormControl(''));
        this.duracionR.push(new FormControl(''));
        this.descripcionR.push(new FormControl(''));
        this.precioServicioR.push(new FormControl(''));
        break;
      case 'canchas':

        this.tipoServicioC.push(new FormControl(''));
        this.nCanchas.push(new FormControl(''));
        this.precioCanchas.push(new FormControl(''));
        break;
      case 'medi':
        this.tipoServicioM.push(new FormControl(''));
        this.nombreEncargado.push(new FormControl(''));
        break;

      default:
        break;
    }
  }

  getBack() {

  }
  getGoing() {

  }
  endRegistro() {
    var userAux = this.registroUser.value;
    var empresaAux = this.registroEmpresa.value;
    var empresa2Aux = this.registroEmpresa2.value;
    var horarioAux = this.registroHorario.value;

    var userValues = {
      usuario: userAux.username,
      email: userAux.mail,
      contraseña: userAux.password,
      tipo: 'Proveedor',
    };

    this.user = userAux.username;
    this.password = userAux.password;

    var empresaValues = {
      NIT: empresaAux.nit,
      nombre: empresaAux.nombreEmpresa,
      //dueño: req.body.dueño,
      horarios: horarioAux,
      telefono1: empresaAux.tlf1,
      telefono2: empresaAux.tlf2,
      direccion: empresaAux.direccion,
      estado: empresaAux.estado,
      pais: empresaAux.pais,
      zona: empresaAux.zona,
      ciudad: empresaAux.ciudad,
      descripcion: empresa2Aux.descripcion,
      nombreBanco: empresa2Aux.nombreBanco,
      numeroBanco: empresa2Aux.numeroBanco,
      tipoCuenta: empresa2Aux.tipoCuenta,
      dueno: userValues.usuario,
      nombreEncargado: empresa2Aux.encargado,
      imagen1: empresa2Aux.imagen1,
      imagen2: empresa2Aux.imagen2,
      imagen3: empresa2Aux.imagen3,
      pagoEnEstablecimiento: empresa2Aux.pagoEnEstablecimiento,
      pagoOnline: empresa2Aux.pagoOnline,
      reservaGratis: empresa2Aux.reservaGratis,

    };
    var empresa2Values = {

    };
    var horarioValues = {

    };
    var servicioValues;

    let tipo = this.tipoSelected;
    switch (tipo) {
      case 'salon':
        this.messageTitle = 'PELUQUERÍA (' + userValues.usuario + ')';
        this.messageContent = 'POR FAVOR SIGUE CONFIGURANDO EL FORMULARIO DE TUS EMPLEADOS O PROFESIONALES Y SEGUIDAMENTE CONFIGURE SUS SERVICIOS';
        this.messageButton = 'SEGUIR CON LA CONFIGURACIÓN DE EMPLEADOS Y PROFESIONALES';
        var servicioAux = this.registroPeluqueria.value;
        servicioValues = {

        };

        break;
      case 'rest':
        this.messageTitle = 'RESTAURANTE O BAR (' + userValues.usuario + ')';
        this.messageContent = 'POR FAVOR SIGUE CONFIGURANDO TUS SERVICIOS';
        var servicioAux = this.registroRestaurant.value;
        this.messageButton = 'SEGUIR CON LA CONFIGURACIÓN DE SERVICIOS';
        servicioValues = {

        };
        break;
      case 'canchas':
        this.messageTitle = 'CANCHAS SINTÉTICAS (' + userValues.usuario + ')';
        this.messageContent = 'POR FAVOR SIGUE CONFIGURANDO TUS SERVICIOS';
        this.messageButton = 'SEGUIR CON LA CONFIGURACIÓN DE SERVICIOS';
        var servicioAux = this.registroCancha.value;
        servicioValues = {

        };
        break;
      case 'medi':
        this.messageTitle = 'CITAS MÉDICAS (' + userValues.usuario + ')';
        this.messageContent = 'POR FAVOR SIGUE CONFIGURANDO TUS SERVICIOS';
        this.messageButton = 'SEGUIR CON LA CONFIGURACIÓN DE SERVICIOS';
        var servicioAux = this.registroMedico.value;
        servicioValues = {

        };
        break;

      default:
        break;
    }

    let refreshList = [
      {
        endpoint: '/users/',
        name: 'users',
        values: userValues
      },
      {
        endpoint: '/empresas/',
        name: 'empresas',
        values: empresaValues
      },
/*       {
        endpoint: '/servicios/all',
        name: 'servicios',
        values: 'servicioValues'
      },
 */    ]
    let dataArray = [];
    refreshList.forEach(element => {
      dataArray.push(this.dbHandler.createSomething(element.values, element.endpoint));
    });
    forkJoin(dataArray).subscribe(info => {
      let i = 0;
      refreshList.forEach(element => {
        console.log(element);
        i++;
      });
      //      window.location.reload();
      this.closeForm();
      this.toggleMsg();
    });
  }

  toggleMsg() {
    this.endForm = {
      endForm: true
    }
    this.hideOption = {
      hideOption: true
    }

  }

  login() {
    var data = {
      username: this.user,
      password: this.password
    };
    this.auth.login(data).subscribe((logData: any) => {
      if (logData.auth) {
        this.auth.storeData(logData);
        this.router.navigateByUrl('/empresa/2');
      }
    });
  }

  flush() {

  }

  completeForm() {
    this.login();
  }

  closeForm() {
    this.showForm = {
      formAct: false
    }
    this.showBlack = {
      blackAct: false
    }

    this.hideOption = {
      hideOption: false
    }
    this.registroUser.reset();
    this.registroEmpresa.reset();
    this.registroEmpresa2.reset();
    this.registroHorario.reset();
    this.registroMedico.reset();
    this.registroCancha.reset();
    this.registroPeluqueria.reset();
    this.registroRestaurant.reset();
  }

  testCheck() {
    console.log(this.registroHorario.value)
  }

  fileProgress(fileInput, imagen) {
    let file = fileInput.target.files[0];
    if (file) {
      switch (imagen) {
        case 'imagen1':
          this.fileName1 = file.name;
          break;
        case 'imagen2':
          this.fileName2 = file.name;
          break;
        default:
          this.fileName3 = file.name;
          break;
      }
    } else {
      this.fileName1 = "";
      this.fileName2 = "";
      this.fileName3 = "";
    }
  }


}
