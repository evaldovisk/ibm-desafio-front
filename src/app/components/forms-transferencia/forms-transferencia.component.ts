import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect, MatSelectTrigger} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {Cliente} from '../../shared/interfaces/cliente';
import {ClienteService} from '../../shared/services/cliente.service';
import {TransacaoService} from '../../shared/services/transacao.service';
import {ToastrService} from 'ngx-toastr';
import {validValuePattern} from '../../shared/services/valid-value-pattern';

@Component({
  selector: 'app-forms-transferencia',
  standalone: true,
  imports: [
    MatFormField,
    MatOption,
    MatSelect,
    FormsModule,
    MatInput,
    NgForOf,
    MatLabel,
    MatSelectTrigger,
    MatAutocompleteModule,
    MatButton,
    NgClass,
    MatError,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './forms-transferencia.component.html',
  styleUrl: './forms-transferencia.component.scss'
})
export class FormsTransferenciaComponent {
  transferenciaForm: FormGroup;
  toastr: ToastrService = inject(ToastrService);
  clienteService = inject(ClienteService);
  transferenciaService = inject(TransacaoService);


  @Output() refreshEvent = new EventEmitter<void>();
  options: Cliente[] = [];
  filteredOptions: Cliente[] = [];
  selectedValue: Cliente | undefined;
  @Input() cliente!: Cliente | null;

  constructor(private fb: FormBuilder) {
    this.transferenciaForm = this.fb.group({
      destinatario: [null, Validators.required],  // Destinatário
      valor: ['', [Validators.required]] // Valor
    });

    this.atualizarListaClientes();
  }

  atualizarListaClientes() {
    this.clienteService.getAll().subscribe((clientes) => {
      this.options = clientes;
      this.filteredOptions = clientes;
    });
  }

  displayWith(cliente: Cliente): string {
    return cliente ? `${cliente.nome} | ${cliente.numeroConta}` : '';
  }

  filterOptions(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredOptions = this.options.filter(
      (option) =>
        option.nome.toLowerCase().includes(filterValue) ||
        option.numeroConta.toLowerCase().includes(filterValue) ||
        option.email.toLowerCase().includes(filterValue)
    );
  }

  submitForm() {
    if (this.transferenciaForm.invalid) {
      console.log('Formulário inválido');
      return;
    }

    const valorFormatado = this.formatValorForPost(this.transferenciaForm.value.valor);
    console.log(valorFormatado);

    const transferenciaJSON = {
      origem: this.cliente?.conta.id,
      destino: this.transferenciaForm.value.destinatario.conta.id,
      valor: valorFormatado,
    };

    this.transferenciaService.realizarTransferencia(transferenciaJSON).subscribe({
      next: (response) =>
      {
        this.toastr.success('Transferência realizada com sucesso!', 'Sucesso', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
        });

        this.refreshEvent.emit()

      }
        ,
      error: (error) =>
        this.toastr.error('Ocorreu um erro inesperado!', 'Erro', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
        }),
    });

  }

  formatValorForPost(valor: string): number {
    return parseFloat(valor);
  }
}
