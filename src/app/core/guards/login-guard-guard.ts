import { CanActivateFn, Router } from '@angular/router';
import {AuthService} from '../services/auth.service'
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const loginGuardGuard: CanActivateFn = (route, state) => {
 const Auth = inject(AuthService)
 const router =inject(Router)
  return Auth.getuserstatus().pipe(
    take(1) , map(user=>{
      if(user){
        return true;

        }
        else{
  router.navigate(['/login'])
          return false

      }
    })
  )
};
