/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module';

// eslint-disable-next-line prettier/prettier
@Module({
  imports: [ProductosModule],
})
export class AppModule {}