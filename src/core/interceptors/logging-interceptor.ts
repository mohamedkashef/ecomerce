import { HttpInterceptorFn } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { SKIP_LOGGING } from '../http/http-context.tokens';


export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
      // التحقق إذا كان الطلب مطلوب يتخطى الـ logging
    if (req.context.get(SKIP_LOGGING)) {
      return next(req);
    }

    const startTime = Date.now();

    return next(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const duration = Date.now() - startTime;
          
          console.log(`🚀 HTTP ${req.method} ${req.url}`, {
            duration: `${duration}ms`,
            status: event.status,
            body: event.body
          });
        }
      })
    );
};
