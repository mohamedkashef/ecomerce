import { inject, Injectable } from '@angular/core';
import { Config } from 'core/services/config';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout, retry , throwError } from 'rxjs';
import { HttpRequestOptions , HttpOptionsFactory} from 'core/http/http-options.factory';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler } from 'core/http/http-error.handler.service';


@Injectable({
  providedIn: 'root'
})
export class Api {
  private readonly defaultTimeoutDuration = 3000;
  private readonly defaultRetryCount = 3;
  private readonly configService = inject(Config);
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(HttpErrorHandler);

  private buildUrl(endpoint: string): string {
    const baseUrl = this.configService.apiConfig.baseUrl;
    return `${baseUrl}/${endpoint}`;
  }


  private handleError(error: any, skipHandling?: boolean): Observable<never> {
    if (skipHandling) {
      return throwError(() => error);
    }
    
    return this.errorHandler.handleError()(error);
  } 




  public get<T>(
    endpoint: string,
    params?: any,
    options: HttpRequestOptions = {},
  ): Observable<T> {


    const httpParams = HttpOptionsFactory.createParams(params || options.params);
    const context = HttpOptionsFactory.createContext(options);
    const headers = HttpOptionsFactory.createHeaders(options.headers);

    const url = this.buildUrl(endpoint);


    return this.http.get<T>(
      url,
      {
        params: httpParams,
        context: context,
        headers: headers
      }
    ).pipe(

      timeout(options.customTimeout??this.configService.apiConfig.timeout ?? this.defaultTimeoutDuration),
      retry(options.customTimeout??this.configService.apiConfig.retryCount ?? this.defaultRetryCount),
      catchError(error => this.handleError(error, options.skipErrorHandling))

    );
  }

 



















  // private extractData<T>(response: ApiResponse<T>): T {
  //     if (response && response.success) {
  //       return response.data;
  //     } else {
  //       throw new Error(response.error?.message || 'Invalid response format');
  //     }
  //   }
}
