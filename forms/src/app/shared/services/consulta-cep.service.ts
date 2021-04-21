import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  consultaCEP(cep: string){
    //deixar só digitos
    cep = cep.replace(/\D/g, '');
    if (cep !== "") {
      //valdado o cep
      const validarcep = /^[0-9]{8}$/;
      if (validarcep.test(cep)) {
        return this.http.get(`//viacep.com.br/ws/${cep}/json/`);
      }
    }

    return of({});
  }
}
