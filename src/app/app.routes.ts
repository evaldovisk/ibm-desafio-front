import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ExtratoComponent} from './pages/extrato/extrato.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'area-cliente', component: ExtratoComponent}


];
