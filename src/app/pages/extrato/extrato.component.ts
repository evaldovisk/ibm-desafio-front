import {Component, inject, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Cliente} from '../../shared/interfaces/cliente';
import {HeaderExtratoComponent} from '../../shared/components/header-extrato/header-extrato.component';
import {FooterComponent} from '../../shared/components/footer/footer.component';
import {ListTransacoesComponent} from '../../components/list-transacoes/list-transacoes.component';
import {FormsTransferenciaComponent} from '../../components/forms-transferencia/forms-transferencia.component';
import {InfoContaComponent} from '../../components/info-conta/info-conta.component';

@Component({
  selector: 'app-extrato',
  standalone: true,
  imports: [
    HeaderExtratoComponent,
    FooterComponent,
    ListTransacoesComponent,
    FormsTransferenciaComponent,
    InfoContaComponent
  ],
  templateUrl: './extrato.component.html',
  styleUrl: './extrato.component.scss'
})
export class ExtratoComponent implements OnInit {
  router = inject(Router);
  cliente: Cliente | null = null;

  ngOnInit() {
    const state = history.state;
    if (state?.cliente) {
      this.cliente = state.cliente;
      console.log('Cliente recebido:', this.cliente);
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentState = history.state;
        if (currentState?.cliente) {
          this.cliente = currentState.cliente;
        }
      }
    });
  }
}
