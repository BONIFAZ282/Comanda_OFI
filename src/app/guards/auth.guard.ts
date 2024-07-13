import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('rol');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRole = next.data['expectedRole'];
    if (expectedRole && userRole !== expectedRole && userRole !== 'ADMINISTRATIVO') {
      this.router.navigate(['/access-denied']);
      return false;
    }

    return true;
  }
}
