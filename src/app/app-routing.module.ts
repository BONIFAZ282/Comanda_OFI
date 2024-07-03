import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Screens/login/login.component';
import { MenuComponent } from './Screens/menu/menu.component';
import { PrincipalComponent } from './Screens/principal/principal.component';
import { GeneralComponent } from './Screens/general/general.component';
import { CategoriaComponent } from './Screens/categoria/categoria.component';
import { MesaComponent } from './Screens/mesa/mesa.component';
import { PlatoComponent } from './Screens/plato/plato.component';
import { TrabajadorComponent } from './Screens/trabajador/trabajador.component';
import { CargoComponent } from './Screens/cargo/cargo.component';
import { CocineroComponent } from './Screens/cocinero/cocinero.component';
import { TrabajadorDashboardComponent } from './Screens/trabajador-dashboard/trabajador-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'general', component: GeneralComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'mesa', component: MesaComponent },
  { path: 'plato', component: PlatoComponent },
  { path: 'trabajador', component: TrabajadorComponent },
  { path: 'cargo', component: CargoComponent },
  { path: 'cocinero', component: CocineroComponent },
  { path: 'trabajador-dashboard', component: TrabajadorDashboardComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
