import {Component, Input} from '@angular/core';
import {Cliente} from '../../shared/interfaces/cliente';
import {UtilsFormsService} from '../../shared/services/utils-forms.service';

@Component({
  selector: 'app-info-conta',
  standalone: true,
  imports: [],
  templateUrl: './info-conta.component.html',
  styleUrl: './info-conta.component.scss'
})
export class InfoContaComponent {
  @Input() cliente!: Cliente | null;

  protected readonly UtilsFormsService = UtilsFormsService;
}
