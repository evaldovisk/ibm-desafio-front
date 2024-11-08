import {Component, inject} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {UtilsFormsService} from '../../services/utils-forms.service';
import {FormsClienteComponent} from '../../../components/forms-cliente/forms-cliente.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  utils = inject(UtilsFormsService);

  createComponentFormCadastro(){
      this.utils.triggerCreate(FormsClienteComponent);
  }

}
