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
import { GananciasComponent } from './Screens/ganancias/ganancias.component';

import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'principal', component: PrincipalComponent, canActivate: [AuthGuard] },
  { path: 'general', component: GeneralComponent, canActivate: [AuthGuard] },
  { path: 'categoria', component: CategoriaComponent, canActivate: [AuthGuard] },
  { path: 'mesa', component: MesaComponent, canActivate: [AuthGuard] },
  { path: 'plato', component: PlatoComponent, canActivate: [AuthGuard] },
  { path: 'trabajador', component: TrabajadorComponent, canActivate: [AuthGuard] },
  { path: 'cargo', component: CargoComponent, canActivate: [AuthGuard] },
  { path: 'cocinero', component: CocineroComponent, canActivate: [AuthGuard] },
  { path: 'trabajador-dashboard', component: TrabajadorDashboardComponent, canActivate: [AuthGuard] },
  { path: 'ganancias', component: GananciasComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
