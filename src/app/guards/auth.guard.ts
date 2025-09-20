import { CanActivateFn } from '@angular/router';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('Route:', route, 'State:', state);

  if (localStorage.getItem('ACCESS_TOKEN')) {
    return true;
  } else {
    Swal.fire({
      title: 'Access Denied',
      text: 'You don\'t have permission to access this page.',
      icon: 'error',   
      confirmButtonText: 'OK'
    });
    return false;
  }
};
