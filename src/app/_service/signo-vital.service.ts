import { Subject } from 'rxjs';
import { SignoVital } from './../_model/signoVital';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignoVitalService {

  signoVitalCambio = new Subject<SignoVital[]>();
  mensajeCambio = new Subject<string>();

  url:string= `${environment.HOST}/signosvitales`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<SignoVital[]>(this.url);
  }

  listarPorId(idSignoVital: number){
    return this.http.get<SignoVital>(`${this.url}/${idSignoVital}`);
  }

  registrar(signoVital: SignoVital){
    return this.http.post(this.url,signoVital);
  }

  modificar(signoVital: SignoVital){
    return this.http.put(this.url,signoVital);
  }

  eliminar(idSignoVital: number){
    return this.http.delete(`${this.url}/${idSignoVital}`);
  }
}
