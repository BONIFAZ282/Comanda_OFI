import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule aquí

import { AuthGuard } from './guards/auth.guard';
import { UsuarioService } from './Service/usuario.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneralComponent } from './Screens/general/general.component';
import { LoginComponent } from './Screens/login/login.component';
import { MenuComponent } from './Screens/menu/menu.component';
import { PrincipalComponent } from './Screens/principal/principal.component';
import { CategoriaComponent } from './Screens/categoria/categoria.component';
import { MesaComponent } from './Screens/mesa/mesa.component';
import { PlatoComponent } from './Screens/plato/plato.component';
import { TrabajadorComponent } from './Screens/trabajador/trabajador.component';
import { CargoComponent } from './Screens/cargo/cargo.component';
import { CocineroComponent } from './Screens/cocinero/cocinero.component';
import { TrabajadorDashboardComponent } from './Screens/trabajador-dashboard/trabajador-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { GananciasComponent } from './Screens/ganancias/ganancias.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneralComponent,
    LoginComponent,
    MenuComponent,
    PrincipalComponent,
    CategoriaComponent,
    MesaComponent,
    PlatoComponent,
    TrabajadorComponent,
    CargoComponent,
    CocineroComponent,
    TrabajadorDashboardComponent,
    GananciasComponent,
    HeaderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthGuard, UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
