import { IsNotEmpty, isNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"tb_products"})
    export class Produto {
        @PrimaryGeneratedColumn()
        id: number;

        @IsNotEmpty()
        @Column({length: 50, nullable: false})
        nome: string;

        @IsNotEmpty()
        @Column({length: 200, nullable: false})
        descricao: string;

        @IsNotEmpty()
        @Column("decimal", {precision: 3, scale: 2})
        preco: number;

        @IsNotEmpty()
        @Column({length: 200, nullable: false})
        detalhe_produto: string;

        @IsNotEmpty()
        @Column()
        quantidade: number;
        
    }