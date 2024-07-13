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
import { Error404Component } from './components/error404/error404.component';

import { AuthGuard } from './guards/auth.guard';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard], data: { expectedRole: 'MESERO' } },
  { path: 'principal', component: PrincipalComponent, canActivate: [AuthGuard] },
  { path: 'general', component: GeneralComponent, canActivate: [AuthGuard], data: { expectedRole: 'ADMINISTRATIVO' } },
  { path: 'categoria', component: CategoriaComponent, canActivate: [AuthGuard], data: { expectedRole: 'ADMINISTRATIVO' } },
  { path: 'mesa', component: MesaComponent, canActivate: [AuthGuard], data: { expectedRole: 'ADMINISTRATIVO' } },
  { path: 'plato', component: PlatoComponent, canActivate: [AuthGuard], data: { expectedRole: 'ADMINISTRATIVO' } },
  { path: 'trabajador', component: TrabajadorComponent, canActivate: [AuthGuard], data: { expectedRole: 'ADMINISTRATIVO' } },
  { path: 'cargo', component: CargoComponent, canActivate: [AuthGuard], data: { expectedRole: 'ADMINISTRATIVO' } },
  { path: 'cocinero', component: CocineroComponent, canActivate: [AuthGuard], data: { expectedRole: 'COCINERO' } },
  { path: 'trabajador-dashboard', component: TrabajadorDashboardComponent, canActivate: [AuthGuard], data: { expectedRole: 'ADMINISTRATIVO' } },
  { path: 'ganancias', component: GananciasComponent, canActivate: [AuthGuard], data: { expectedRole: 'ADMINISTRATIVO' } },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'error404', component: Error404Component },
  { path: '**', redirectTo: '/error404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
