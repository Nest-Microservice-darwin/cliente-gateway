/* eslint-disable prettier/prettier */
import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';


@Catch(RpcException)
export class RpcCustomExceptionFilter implements RpcExceptionFilter<RpcException> {
  
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    console.log('paso por aqui nuestro custon filter ',host);
    return throwError(() => exception.getError());
    
  }
}