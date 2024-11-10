import {AfterViewInit, Component, inject, OnDestroy, OnInit, Type, ViewChild} from '@angular/core';
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
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  utilsForms = inject(UtilsFormsService)

  @ViewChild('listClientes') listCLientes!: ListClientesComponent;

  formsClienteComponent: Type<any> | null = null;
  private createSubscription: Subscription | undefined;
  private destroySubscription: Subscription | undefined
  private refreshSubscription: Subscription | undefined;


  ngOnInit() {
    this.createSubscription = this.utilsForms.create$.subscribe(component => {
      this.instantiateComponent(component);
    })

    this.destroySubscription = this.utilsForms.destroy$.subscribe(() => {
      this.destroyComponent();
    })

    this.refreshSubscription = this.utilsForms.refresh$.subscribe(() => {
      this.onRefresh();
    });
  }

  ngAfterViewInit() {
    // Aguardar a inicialização do ViewChild
    setTimeout(() => {
      console.log('ListClientesComponent disponível', this.listCLientes);
    });
  }

  onRefresh() {
    console.log('Refresh acionado, atualizando a lista...');
    if (this.listCLientes) {
      this.listCLientes.refresh();  // Certificando que a função é chamada no componente
    } else {
      console.error('ListClientesComponent ainda não está disponível');
    }
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
