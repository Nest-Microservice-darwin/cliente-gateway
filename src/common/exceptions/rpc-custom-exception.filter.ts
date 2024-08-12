/* eslint-disable prettier/prettier */
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
//import { Observable } from 'rxjs';
import { RpcException } from '@nestjs/microservices';


@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  
  catch(exception: RpcException, host: ArgumentsHost) {
    //console.log('paso por aqui nuestro custon filter ',host);
    //return throwError(() => exception.getError());
    //throw new UnauthorizedException('hola mi error');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.statusCode(401).json({
      status: 401,
      Message: 'hoka mi error'
    })

    
  }
}