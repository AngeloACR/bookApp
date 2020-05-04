import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { forkJoin } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DbHandlerService {

	today = new Date;
	localSource = 'http://localhost:3400';
	serverSource = '';


	//mySource = this.localSource
	mySource = this.serverSource

	constructor(
		private http: HttpClient,
		private datePipe: DatePipe,
		private auth: AuthService
	) {
	}

	createSomething(body, endpoint) {
		let headers = new HttpHeaders();
		headers = headers.append('Content-Type', 'application/json');
		let token = this.auth.getToken();
		if (token != null) {
			headers = headers.append('Authorization', token)
		}
		var address = this.mySource;

		address = address + endpoint;

		return this.http.post(address, body, { headers: headers });

	}

	getSomething(endpoint) {
		let headers = new HttpHeaders();
		headers = headers.append('Content-Type', 'application/json');
		let token = this.auth.getToken();
		headers = headers.append('Authorization', token)
		var address = this.mySource;

		address = address + endpoint;

		return this.http.get(address, { headers: headers });
	}

	updateSomething(body, endpoint) {
		let headers = new HttpHeaders();
		headers = headers.append('Content-Type', 'application/json');
		let token = this.auth.getToken();
		headers = headers.append('Authorization', token)

		var address = this.mySource;

		address = address + endpoint;


		return this.http.put(address, body, { headers: headers });
	}

	deleteSomething(item, endpoint) {
		let headers = new HttpHeaders();
		headers = headers.append('Content-Type', 'application/json');
		let token = this.auth.getToken();
		headers = headers.append('Authorization', token)

		var address = this.mySource;

		address = address + endpoint;

	    item = JSON.stringify(item)
	
		let params = new HttpParams()
		params = params.append('item', item);

		let options = {
			headers: headers,
			params: params
		};

		return this.http.delete(address, options);
	}

	setLocal(name, value) {
		localStorage.removeItem(name);
		localStorage.setItem(name, JSON.stringify(value));
	}

	getLocal(name) {
		var value = JSON.parse(localStorage.getItem(name));
		return value;
	}

	refreshData(info, name) {
		if(info['values'] && info['values'].length){

		console.log(name);
		let fields = info['fields'];
		let values = info['values'];
		this.setLocal(name + 'Values', values);
		this.setLocal(name + 'Fields', fields);
		} else{
		this.setLocal(name + 'Values', []);
		this.setLocal(name + 'Fields', []);
		}
	}

  actualizar() {
    let refreshList = [
      {
        endpoint: '/users/all',
        name: 'users'
      },
      {
        endpoint: '/empresas/',
        name: 'empresas'
      },
      {
        endpoint: '/reservas/',
        name: 'reservas'
      },
      {
        endpoint: '/servicios/all',
        name: 'servicios'
      }
    ]
    let dataArray = [];
    refreshList.forEach(element => {
      dataArray.push(this.getSomething(element.endpoint));
    });
    forkJoin(dataArray).subscribe(info => {
      let i = 0;
      refreshList.forEach(element => {
      console.log(element);
        this.refreshData(info[i], element.name);
        i++;
      });
      window.location.reload();
    });
  }



}
