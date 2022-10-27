import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike, DeleteResult } from 'typeorm'
import { Produto } from '../entities/produtos.entity'

@Injectable()
export class ProdutosService{
    constructor(@InjectRepository(Produto)
    private produtosRepository: Repository<Produto>) {}

// Metodo para achar todos
    async findAll(): Promise<Produto[]> {
        return await this.produtosRepository.find()
    }

// Metodo achar pelo ID 
    async findById(id: number): Promise<Produto> {
        let produtos = await this.produtosRepository.findOne({
            where: {
                id
            }
        })
        if (!produtos) {
            throw new HttpException ('Produto cujo id foi referido não existe!', HttpStatus.NOT_FOUND)
        }
        return produtos;
    }   

// Metodo de achar pelo Nome
    async findByName(nome: string): Promise<Produto[]> {
        return await this.produtosRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            }

        })
    }

 // Metodo de CRIAR DADOS NO BANCO DE DADOS
    async create(produtos: Produto): Promise<Produto> {
        return await this.produtosRepository.save(produtos);
    } 

// Metodo de atualizar DADOS NO BANCO DE DADOS
    async update(produtos: Produto): Promise<Produto> {
        let buscarProdutos: Produto = await this.findById(produtos.id)
    if (!buscarProdutos || !produtos.id) {
        throw new HttpException(`id referente ao Produto não existe.`, HttpStatus.NOT_FOUND)
    }
    return await this.produtosRepository.save(produtos);
    }

// Metodo DELETE
    async delete(id: number): Promise<DeleteResult> {
        let buscarProdutos: Produto = await this.findById(id);
        if (!buscarProdutos) {
            throw new HttpException(`ID referente ao produto não existe`, HttpStatus.NOT_FOUND);
        }
        return await this.produtosRepository.delete(id);
    }

}
