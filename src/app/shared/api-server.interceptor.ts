import { Inject, Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ApiServerInterceptor implements HttpInterceptor {
  constructor(@Inject("BACKEND_URL") private backendUrl: string) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const apiReq = request.clone({
      url: `${this.backendUrl}/${request.url}`,
      withCredentials: true,
    });

    return next.handle(apiReq);
  }
}
