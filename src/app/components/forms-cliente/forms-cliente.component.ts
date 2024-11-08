import {Component, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {MatError, MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {UtilsFormsService} from '../../shared/services/utils-forms.service';
import {ClienteService} from '../../shared/services/cliente.service';
import {Cliente} from '../../shared/interfaces/cliente';
import {ToastrService} from 'ngx-toastr';
import {ResponseDefault} from '../../shared/interfaces/response-default';

@Component({
  selector: 'app-forms-cliente',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    MatLabel,
    NgIf,
    MatIcon,
    MatHint,
    MatError
  ],
  templateUrl: './forms-cliente.component.html',
  styleUrl: './forms-cliente.component.scss'
})
export class FormsClienteComponent {
  @Output() atualizarClientes = new EventEmitter<void>();

  toastr: ToastrService = inject(ToastrService);
  utilsService = inject(UtilsFormsService);
  clienteService: ClienteService = inject(ClienteService);

  protected readonly valueHint = signal('');

  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      idade: ['', [Validators.required, Validators.min(18), Validators.pattern("^[0-9]*$")]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      numeroConta: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]*$")]]
    });
  }


  onSubmit() {
    if (this.formulario.valid) {
      const cliente: Cliente = this.formulario.value;

      this.clienteService.post(cliente).subscribe({
        next: (response) => this.toastr.success('Cadastro reaizado com sucesso!', 'Sucesso', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true
        }),
        error: (error) => this.toastr.error('Ocorreu um error inesperado!', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true
        })
      });

      this.atualizarClientes.emit();
    }

  }

  protected onInput(event: Event) {
    this.valueHint.set((event.target as HTMLInputElement).value);
  }

  value(): string {
    return this.formulario.get('numeroConta')?.value || '';
  }

  @Output() destroyEvent = new EventEmitter<void>();

  destroyComponent() {
    this.destroyEvent.emit();
    this.utilsService.triggerDestroy()

  }
}
