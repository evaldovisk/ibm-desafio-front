import {Injectable, Type} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsFormsService {

  private createSubject = new Subject<Type<any>>();
  create$ = this.createSubject.asObservable();

  private destroySubject = new Subject<void>();
  destroy$ = this.destroySubject.asObservable();

  constructor() { }

  triggerCreate(component: Type<any>){
    this.createSubject.next(component);
  }


  triggerDestroy(){
    this.destroySubject.next();
  }

  static formatarSaldo(saldo: number | undefined): string {
    if (saldo === undefined) {
      return "Saldo indisponível";
    }

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(saldo);
  }

  static formatarData(dataISO: string | undefined): string {
    if (dataISO === undefined) {
      return "Error";
    }

    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
