import { Controller, Get, HttpStatus, HttpCode, Param, ParseIntPipe, Body, Post, Patch, Delete } from '@nestjs/common'
import { Usuario } from '../Entities/usuario.entity';
import { UsuarioService } from '../services/usuario.service';

@Controller("/usuario")
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {}

    // Retornando para o metodo de achar todos.
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]>{
        return this.usuarioService.findAll();
    }

    // Retornando para o metodo de achar pelo iD.
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id_usuario: number): Promise<Usuario> {
        return this.usuarioService.findById(id_usuario);
    } 

    // Retornando para o metodo de achar pelo Nome.
    @Get('/search/:nome')
    @HttpCode(HttpStatus.OK)
    findByName(@Param('nome')nome_usuario: string): Promise<Usuario[]> {
        return this.usuarioService.findByName(nome_usuario);
    }

    // Retornando para o modo de criar um post no Banco de Dados
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.create(usuario);
    }

    // Retornando para um modo de atualizar o banco de dados
    @Patch()
    @HttpCode(HttpStatus.OK)
    update(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.update(usuario);
    }

    // Delete
    @Delete('/id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id_usuario: number){
        return this.usuarioService.delete(id_usuario);
    }
}