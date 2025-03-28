import { HttpInterceptorFn } from '@angular/common/http';

export const tokenHttpInterceptor: HttpInterceptorFn = (req, next) => {
  // ✅ Check if localStorage is available
  let token = '';
  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem('token') || '';
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: token, // 🔹 Sending only the token
      },
    });
  }

  return next(req);
};
