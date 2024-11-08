import {Component, inject, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {HeaderComponent} from "../../shared/components/header/header.component";
import {ListClientesComponent} from '../../components/list-clientes/list-clientes.component';
import {FooterComponent} from '../../shared/components/footer/footer.component';
import {FormsClienteComponent} from '../../components/forms-cliente/forms-cliente.component';
import {Subscription} from 'rxjs';
import {UtilsFormsService} from '../../shared/services/utils-forms.service';
import {NgComponentOutlet} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    ListClientesComponent,
    FooterComponent,
    NgComponentOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  utilsForms = inject(UtilsFormsService)

  formsClienteComponent: Type<any> | null = null;
  private createSubscription: Subscription | undefined;
  private destroySubscription: Subscription | undefined;


  ngOnInit() {
    this.createSubscription = this.utilsForms.create$.subscribe(component => {
      this.instantiateComponent(component);
    })

    this.destroySubscription = this.utilsForms.destroy$.subscribe(() => {
      this.destroyComponent();
    })
  }

  ngOnDestroy() {
    if(this.createSubscription) {
      this.createSubscription.unsubscribe();
    }

    if(this.destroySubscription) {
      this.destroySubscription.unsubscribe();
    }

  }


  createComponent(){
    this.utilsForms.triggerCreate(FormsClienteComponent);
  }

  instantiateComponent(component: Type<any>){
    this.formsClienteComponent = component;
  }

  destroyComponent(){
    this.formsClienteComponent = null;
  }

}
