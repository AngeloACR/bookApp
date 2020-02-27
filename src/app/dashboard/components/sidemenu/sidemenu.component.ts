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

	setAdminMenu() {
		this.myMenu = [{
			name: 'Agenda',
			link: '/agenda/0',
			id: 0,
			icon: faAddressBook
		},
		{
			name: 'Perfil',
			link: '/perfil/0',
			id: 1,
			icon: faIdCard
		},
		{
			name: 'Administrador',
			link: '/adm/0',
			id: 2,
			icon: faUserCog

		}];
	}

	setEmpleadoMenu() {
		this.myMenu = [{
			name: 'Perfil',
			id: 0,
			icon: faIdCard
		}];
	}

}
