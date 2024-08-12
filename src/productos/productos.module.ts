/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductosController } from './productos.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_SERVICE, envs } from 'src/config';

@Module({
  controllers: [ProductosController],
  providers: [],
  imports: [
    ClientsModule.register([
      {name: PRODUCT_SERVICE, 
        transport:Transport.TCP,
        options: {
          host: envs.productosMicroservicioHost,
          port: envs.productosMicroservicioPort,
        }
      },
    ]),
  ]
})
export class ProductosModule {}
