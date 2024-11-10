import {Component, inject, Input, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {Cliente} from '../../interfaces/cliente';
import {FooterComponent} from '../footer/footer.component';
import {UtilsFormsService} from '../../services/utils-forms.service';
import {ClienteService} from '../../services/cliente.service';

@Component({
  selector: 'app-header-extrato',
  standalone: true,
  imports: [
    MatToolbar,
    FooterComponent
  ],
  templateUrl: './header-extrato.component.html',
  styleUrl: './header-extrato.component.scss'
})
export class HeaderExtratoComponent implements OnInit {
  clienteService: ClienteService = inject(ClienteService);
  @Input() cliente!: Cliente | null;

  ngOnInit() {
    this.atualizaSaldo()
  }
  atualizaSaldo(){
    if(this.cliente?.id == null){
      return;
    }

    this.clienteService.getById(this.cliente.id).subscribe(cliente => {
      this.cliente = cliente;
    })
  }

  protected readonly UtilsFormsService = UtilsFormsService;

  refresh() {

    this.atualizaSaldo();
  }
}
