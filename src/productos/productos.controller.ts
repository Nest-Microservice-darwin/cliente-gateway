/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Body, Post, Delete,Patch } from '@nestjs/common';


@Controller('productos')
export class ProductosController {
  constructor() {}


  @Post()
  CreateProduct() {
    return 'Crear un producto';
  }

  @Get()
  buscarVariosProduct() {
    return 'Esta funcion regresa varios Productos';
  }

  @Get(':id')
  buscarXidProduct(@Param('id') id: string) {
    return 'Esta funcion regresa un producto  con Id:' + id;
  }

  @Delete(':id')
  deleterXidProduct(@Param('id') id: string) {
    return 'Esta funcion Elimina un producto con Id:' + id;
  }

  @Patch(':id')
  updateXidProduct(
    @Param('id') id: string,
    @Body() body: any
  ) {
    return 'Esta funcion actualiza el producto'+id ;
  }

};
