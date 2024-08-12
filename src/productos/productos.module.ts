/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductosController } from './productos.controller';

@Module({
  controllers: [ProductosController],
  providers: [],
})
export class ProductosModule {}
