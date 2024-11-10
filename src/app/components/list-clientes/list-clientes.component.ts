import {ChangeDetectorRef, Component, inject, OnInit, ViewChild} from '@angular/core';
import {ClienteService} from '../../shared/services/cliente.service';
import {Cliente} from '../../shared/interfaces/cliente';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-clientes',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButton, MatIcon],

  templateUrl: './list-clientes.component.html',
  styleUrl: './list-clientes.component.scss'
})
export class ListClientesComponent implements OnInit {
  router = inject(Router);
  clienteService = inject(ClienteService);
  cdr = inject(ChangeDetectorRef);


  displayedColumns: string[] = ['nome', 'email', 'numeroConta', 'botao'];
  dataSource = new MatTableDataSource<Cliente>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit() {
    this.atualizarListaClientes();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAction(cliente: Cliente) {
    this.router.navigate(['/area-cliente'], {
      state: { cliente }
    })
  }

  atualizarListaClientes() {
    this.clienteService.getAll().subscribe((clientes) => {
      this.dataSource.data = clientes;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges();
    });
  }

  refresh() {
    this.atualizarListaClientes();
  }
}
