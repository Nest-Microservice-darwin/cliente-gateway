/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, Param, Body, Post, Delete,Patch, Inject, Query, ParseIntPipe  } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { catchError  } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller('productos')
export class ProductosController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productoClient:ClientProxy,
  ) {}


  @Post()
  CreateProduct(@Body() crearPoroductoDto: CreateProductDto) {
    //return 'Crear un producto';
    return this.productoClient.send( {cmd: 'create_product'},crearPoroductoDto);
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
    /* MANERA "B"
    return  this.productoClient.send({cmd: 'find_one_product'},{id})
     .pipe(
        catchError(err => { throw new RpcException(err) })
     )
*/

   /* manera "A" */
    try {

       const producto = await firstValueFrom(
        this.productoClient.send({cmd: 'find_one_product'},{id})
      );

      return producto;
      
    } catch (error) {

      //throw new BadRequestException(error);
      throw new RpcException(error);
  
    }
     
// aqui el cierre del modo b */

  }

  @Delete(':id')
  deleterXidProduct(@Param('id') id: string) {
    return this.productoClient.send({cmd: 'delete_products'},{id: id}).pipe(
      catchError(err => { throw new RpcException(err);
        
       }),
   );
  }

  @Patch(':id')
  updateXidProduct(
    @Param('id', ParseIntPipe) id: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() updateProductoDto:UpdateProductDto,
  ) {
    return this.productoClient.send({cmd: 'update_products'}, {
      id, ...updateProductoDto
    }).pipe(
      catchError(err => { throw new RpcException(err) })
   );
    //return {id, updateProductoDto}
  }

};
