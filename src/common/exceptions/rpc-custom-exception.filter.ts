/* eslint-disable prettier/prettier */
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';


@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  
  catch(exception: RpcException, host: ArgumentsHost) {
    //console.log('paso por aqui nuestro custon filter ',host);
    //return throwError(() => exception.getError());
    //throw new UnauthorizedException('hola mi error');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();
    console.log(rpcError);

    if (
      typeof rpcError === 'object' && 
      'status' in rpcError && 
      'message' in rpcError
    ) {

      const status = isNaN(+rpcError.status) ? 400: +rpcError.status ;
      return response.status(status).json(rpcError);

    }

    response.status(401).json({
      status: 400,
      message: rpcError,
    });

    
  }
}