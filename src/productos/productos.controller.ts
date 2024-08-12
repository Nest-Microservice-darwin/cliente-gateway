/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Body, Post, Delete,Patch, Inject, Query, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';


@Controller('productos')
export class ProductosController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productoClient:ClientProxy,
  ) {}


  @Post()
  CreateProduct() {
    return 'Crear un producto';
  }

  @Get()
  buscarVariosProduct( @Query() paginationDto: PaginationDto ) {
    //return 'Esta funcion regresa varios Productos';
    return this.productoClient.send({cmd: 'find_all_products'},paginationDto)
  }

  /*
  @Get(':id')
  buscarXidProduct(@Param('id') id: string) {
    //return 'Esta funcion regresa un producto  con Id:' + id;
    return this.productoClient.send({cmd: 'find_one_product'},{id:id})


  }
    */
  @Get(':id')
  async buscarXidProduct(@Param('id') id: string) {
    
    try {

       const producto = await firstValueFrom(
        this.productoClient.send({cmd: 'find_one_product'},{id})
      );

      return producto;
      
    } catch (error) {

      throw new BadRequestException(error);
      
    }
    


  }

  @Delete(':id')
  deleterXidProduct(@Param('id') id: string) {
    return 'Esta funcion Elimina un producto con Id:' + id;
  }

  @Patch(':id')
  updateXidProduct(
    @Param('id') id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() body: any
  ) {
    return 'Esta funcion actualiza el producto'+id ;
  }

};
