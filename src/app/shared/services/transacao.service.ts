import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Transacao} from '../interfaces/transacao';
import {ResponseDefault} from '../interfaces/response-default';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  private readonly urlApi: string = 'http://localhost:8080/transacao';

  httpClient = inject(HttpClient);

  getAll(id: number | undefined): Observable<Transacao[]> {
    return this.httpClient.get<ResponseDefault<Transacao[]>>(`${this.urlApi}/all/${id}`)
      .pipe(
        map((response: ResponseDefault<Transacao[]>) => {
          return response.data;
        })
      );
  }

  realizarTransferencia(data: any): Observable<any> {
    return this.httpClient.post<any>(this.urlApi, data)
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
  }
}
