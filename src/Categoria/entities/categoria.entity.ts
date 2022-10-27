import { IsNotEmpty } from "class-validator";
import { ProdutosService } from "src/Produtos/services/produtos.service";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"
import { Produto } from "src/Produtos/entities/produtos.entity";


@Entity({name: "tb_category"})
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 50, nullable: false})
    fornecedor : string

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    modelo: string;

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    material: string;

    @OneToMany(() => Produto, (produto) => produto.categoria)
    produto: Produto[]
}