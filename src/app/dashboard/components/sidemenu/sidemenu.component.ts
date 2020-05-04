import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { faQuestionCircle, faCalendarPlus, faComments, faIdCard, faUserCog, faAddressBook, faDollarSign } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-sidemenu',
	templateUrl: './sidemenu.component.html',
	styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

	boxOn: boolean;
	menuOn: number;
	prevMenu: number;

	user: any;
	isAdmin: boolean;
	isEmpleado: boolean;

	myMenu: any;
	adminMenu: any;
	empleadoMenu: any;

	constructor(
		private auth: AuthService
	) {

	}

	ngOnInit() {

		this.user = this.auth.decode();
		this.isAdmin = (this.user.tipo === 'Admin');
		this.isEmpleado = (this.user.tipo === 'Empleado');
		if (this.isAdmin) {
			this.setAdminMenu();
		} else if (this.isEmpleado) {
			this.setEmpleadoMenu();
		}
	}

	setEmpresaMenu() {
		this.myMenu = [{
			name: 'Bookwork',
			link: '/agenda/0',
			id: 1,
			icon: faAddressBook,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Crear Cita o Reserva',
				link: '/agenda/0',
				id: 0
			},
			{
				name: 'Lista Cita o Reserva',
				link: '/agenda/1',
				id: 1
			}
			],
		},
		{
			name: 'Notificaciones',
			link: '/notificaciones/0',
			id: 2,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Crear Notificaciones Sucursal',
				link: '/notificaciones/0',
				id: 0
			},
			{
				name: 'Listar Notificaciones',
				link: '/notificaciones/1',
				id: 1
			}
			],
		},
		{
			name: 'Historial de Reservas',
			link: '/historial/0',
			id: 3,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [
			],
		},
		{
			name: 'Mi Empresa',
			link: '/empresa/0',
			id: 4,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Crear de Sucursal',
				link: '/empresa/0',
				id: 0
			},
			{
				name: 'Listar Sucursales',
				link: '/empresa/1',
				id: 1
			},
			{
				name: 'Crear Empleado/Profesional',
				link: '/empresa/2',
				id: 2
			},
			{
				name: 'Listar Empleados/Profesionales',
				link: '/empresa/3',
				id: 3
			},
			{
				name: 'Crear Servicio',
				link: '/empresa/4',
				id: 4
			},
			{
				name: 'Listar Servicios',
				link: '/empresa/5',
				id: 5
			},
			],
		},
		{
			name: 'Promociones',
			link: '/promo/0',
			id: 5,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Crear Promoción',
				link: '/promo/0',
				id: 0
			},
			{
				name: 'Listar Promoción',
				link: '/promo/1',
				id: 1
			}
			],
		},
		{
			name: 'Promociones Destacadas',
			link: '/promo/2',
			id: 6,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Crear Promoción Destacada',
				link: '/promo/2',
				id: 0
			},
			{
				name: 'Listar Promoción Destacada',
				link: '/promo/3',
				id: 1
			}
			],
		},
		{
			name: 'Estadísticas',
			link: '/estadisticas/0',
			id: 7,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Ver Citas Confirmadas',
				link: '/estadisticas/0',
				id: 0
			},
			{
				name: 'Ver Citas Canceladas',
				link: '/estadisticas/1',
				id: 1
			}, {
				name: 'Usuarios Registrados',
				link: '/estadisticas/2',
				id: 2
			}
			],
		},
		{
			name: 'Términos y Condiciones',
			link: '/terminos/0',
			id: 8,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Crear Términos y Condiciones',
				link: '/terminos/0',
				id: 0
			},
			{
				name: 'Listar Términos y Condiciones',
				link: '/terminos/1',
				id: 1
			}
			],
		},
		{
			name: 'Soporte y Ayuda',
			link: '/soporte/0',
			id: 9,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Crear Ayuda',
				link: '/soporte/0',
				id: 0
			},
			{
				name: 'Lista de Ayuda',
				link: '/soporte/1',
				id: 1
			}
			],
		}
		];
	}

	setAdminMenu() {
		this.myMenu = [{
			name: 'Administrador',
			link: '/adm/0',
			id: 0,
			icon: faUserCog,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Crear Usuarios',
				link: '/adm/0',
				id: 0
			},
			{
				name: 'Lista Usuarios',
				link: '/adm/1',
				id: 1
			},
			{
				name: 'Crear Roles',
				link: '/adm/2',
				id: 2
			},
			{
				name: 'Listar Roles',
				link: '/adm/3',
				id: 3
			},
			{
				name: 'Asignacion de permisos',
				link: '/adm/4',
				id: 4
			},
			],
		},
		{
			name: 'Bookwork',
			link: '/agenda/0',
			id: 1,
			icon: faAddressBook,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Crear Cita o Reserva',
				link: '/agenda/0',
				id: 0
			},
			{
				name: 'Lista Cita o Reserva',
				link: '/agenda/1',
				id: 1
			}
			],
		},
		{
			name: 'Notificaciones',
			link: '/notificaciones/0',
			id: 2,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Crear Notificaciones Sucursal',
				link: '/notificaciones/0',
				id: 0
			},
			{
				name: 'Listar Notificaciones',
				link: '/notificaciones/1',
				id: 1
			}
				,
			{
				name: 'Crear Notificaciones Admin',
				link: '/notificaciones/2',
				id: 2
			}
				,
			{
				name: 'Listar Notificaciones Admin',
				link: '/notificaciones/3',
				id: 3
			}
			],
		},
		{
			name: 'Historial de Reservas',
			link: '/historial/1',
			id: 3,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [
			],
		},
		{
			name: 'Buscador de Empresas',
			link: '/empresa/6',
			id: 4,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Crear Empresa',
				link: '/empresa/6',
				id: 0
			},
			{
				name: 'Listar Empresas',
				link: '/empresa/7',
				id: 1
			}
			],
		},
		{
			name: 'Buscador de Sucursales',
			link: '/empresa/8',
			id: 5,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Crear Sucursal',
				link: '/empresa/8',
				id: 0
			},
			{
				name: 'Listar Sucursales',
				link: '/empresa/9',
				id: 1
			}
			],
		},
		{
			name: 'Buscador de Empleados/Profesionales',
			link: '/empresa/10',
			id: 6,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Crear Empleado/Profesional',
				link: '/empresa/10',
				id: 0
			},
			{
				name: 'Listar Empleados/Profesionales',
				link: '/empresa11',
				id: 1
			}
			],
		},
		{
			name: 'Busqueda de Servicios',
			link: '/empresa/12',
			id: 7,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Crear Servicio',
				link: '/empresa/12',
				id: 0
			},
			{
				name: 'Listar Servicios',
				link: '/empresa/13',
				id: 1
			}
			],
		},
		{
			name: 'Promociones',
			link: '/promo/0',
			id: 8,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Crear Promoción',
				link: '/promo/0',
				id: 0
			},
			{
				name: 'Listar Promoción',
				link: '/promo/1',
				id: 1
			}
			],
		},
		{
			name: 'Promociones Destacadas',
			link: '/promo/2',
			id: 9,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Crear Promoción Destacada',
				link: '/promo/2',
				id: 0
			},
			{
				name: 'Listar Promoción Destacada',
				link: '/promo/3',
				id: 1
			}
			],
		},
		{
			name: 'Estadísticas',
			link: '/estadisticas/0',
			id: 10,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Usuarios Registrados',
				link: '/estadisticas/2',
				id: 0
			},
			{
				name: 'Citas Confirmadas por Empresa',
				link: '/estadisticas/3',
				id: 1
			},
			{
				name: 'Citas Canceladas por Empresa',
				link: '/estadisticas/4',
				id: 2
			}

			],
		},
		{
			name: 'Clientes',
			link: '/cliente/0',
			id: 11,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Crear Cliente',
				link: '/cliente/0',
				id: 0
			},
			{
				name: 'Listar Clientes',
				link: '/cliente/1',
				id: 1
			}
			],
		},
		{
			name: 'Términos y Condiciones',
			link: '/terminos/0',
			id: 12,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Crear Términos y Condiciones',
				link: '/terminos/0',
				id: 0
			},
			{
				name: 'Listar Términos y Condiciones',
				link: '/terminos/1',
				id: 1
			}
			],
		},
		{
			name: 'Soporte y Ayuda',
			link: '/soporte/0',
			id: 13,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Crear Ayuda',
				link: '/soporte/0',
				id: 0
			},
			{
				name: 'Lista de Ayuda',
				link: '/soporte/1',
				id: 1
			}
			],
		},
		{
			name: 'Pago Online',
			link: '/pagos/0',
			id: 14,
			icon: faIdCard,
			class: {
				aBox: false
			},
			childs: [{
				name: 'Listar pagos',
				link: '/pagos/0',
				id: 0
			}
			],
		}
		];
	}


	setEmpleadoMenu() {
		this.myMenu = [{
			name: 'Perfil',
			id: 0,
			icon: faIdCard
		}];
	}

	tMenu(event, item) {
		this.closeMenus();
		this.myMenu[item.id].class = {
			aBox: true,
		}
	}

	closeMenus() {
		this.myMenu.forEach(item => {
			item.class = {
				aBox: false,
			}
		});
	}

}
