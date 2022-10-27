import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike, DeleteResult } from 'typeorm'
import { Usuario } from '../Entities/usuario.entity'

@Injectable()
export class UsuarioService{
    constructor(@InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>) {}

// Metodo para achar todos
    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find()
    }

// Metodo achar pelo ID 
    async findById(id_usuario: number): Promise<Usuario> {
        let usuario = await this.usuarioRepository.findOne({
            where: {
                id_usuario
            }
        })
        if (!usuario) {
            throw new HttpException ('Usuario cujo id foi referido não existe!', HttpStatus.NOT_FOUND)
        }
        return usuario;
    }   

// Metodo de achar pelo Nome
    async findByName(nome_usuario: string): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            where: {
                nome_usuario: ILike(`%${nome_usuario}%`)
            }

        })
    }

 // Metodo de CRIAR DADOS NO BANCO DE DADOS
    async create(usuario: Usuario): Promise<Usuario> {
        return await this.usuarioRepository.save(usuario);
    } 

// Metodo de atualizar DADOS NO BANCO DE DADOS
    async update(usuario: Usuario): Promise<Usuario> {
        let buscarUsuario: Usuario = await this.findById(usuario.id_usuario)
    if (!buscarUsuario || !usuario.id_usuario) {
        throw new HttpException(`id referente ao Usuario não existe.`, HttpStatus.NOT_FOUND)
    }
    return await this.usuarioRepository.save(usuario);
    }

// Metodo DELETE
    async delete(id: number): Promise<DeleteResult> {
        let buscarUsuarios: Usuario = await this.findById(id);
        if (!buscarUsuarios) {
            throw new HttpException(`ID referente ao Usuario não existe`, HttpStatus.NOT_FOUND);
        }
        return await this.usuarioRepository.delete(id);
    }

}
