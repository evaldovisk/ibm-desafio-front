import {Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {Transacao} from '../../shared/interfaces/transacao';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {TransacaoService} from '../../shared/services/transacao.service';
import {Cliente} from '../../shared/interfaces/cliente';

@Component({
  selector: 'app-list-transacoes',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatInput,
    MatLabel,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    MatHeaderCellDef,
    CurrencyPipe,
    DatePipe,
    MatButton
  ],
  providers: [DatePipe],
  templateUrl: './list-transacoes.component.html',
  styleUrl: './list-transacoes.component.scss'
})
export class ListTransacoesComponent implements OnInit {
  transacaoService = inject(TransacaoService);

  displayedColumns: string[] = ['nomeDestino', 'conta', 'idTransacao', 'tipo', 'dataTransacao', 'valor'];
  dataSource = new MatTableDataSource<Transacao>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() cliente!: Cliente | null;

  constructor() {
  }

  ngOnInit() {
    this.atualizarListaTransacao();
  }

  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }


  atualizarListaTransacao() {
    if (this.cliente?.conta?.id) {
      this.transacaoService.getAll(this.cliente.conta.id).subscribe((transacoes) => {
        this.dataSource.data = transacoes;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  filterByDate(number: number) {

  }

  refresh() {
    this.atualizarListaTransacao();
  }
}
