import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../service/auth.service";

export const adminGaurd: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.isUserLoggedIn){
    if(authService.isAdminTrue){
      return true
    }else{
      router.navigateByUrl('/')
      return false
    }
  }else{
    router.navigateByUrl('/login')
    return false;
  }
}