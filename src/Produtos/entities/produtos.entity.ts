import { IsNotEmpty, isNotEmpty } from "class-validator";
import { CategoriaService } from "src/Categoria/services/categoria.service";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "src/Categoria/entities/categoria.entity";
import { Usuario } from "src/Usuario/Entities/usuario.entity";

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
        
        @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
            onDelete: "CASCADE"
        })
        categoria: Categoria;

        @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
            onDelete: "CASCADE"
        })
        usuario: Usuario;
    
    }