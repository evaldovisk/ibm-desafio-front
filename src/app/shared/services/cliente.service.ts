import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cliente} from '../interfaces/cliente';
import {map, Observable} from 'rxjs';
import {ResponseDefault} from '../interfaces/response-default';
import {Transacao} from '../interfaces/transacao';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly urlApi: string = 'http://localhost:8080/cliente';

  httpClient = inject(HttpClient);

  getById(id: number): Observable<Cliente> {
    return this.httpClient.get<ResponseDefault<Cliente>>(`${this.urlApi}/${id}`)
      .pipe(
        map((response: any) => response.data
        ));
  }

  getAll(): Observable<Cliente[]> {
    return this.httpClient.get<ResponseDefault<Cliente[]>>(this.urlApi)
      .pipe(
        map((response: any) => response.data
        ));
  }

  post(cliente: Cliente): Observable<ResponseDefault<Cliente>> {
    return this.httpClient.post<ResponseDefault<Cliente>>(this.urlApi, cliente);
  }


}
