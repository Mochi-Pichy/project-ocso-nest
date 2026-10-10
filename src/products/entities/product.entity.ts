import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Product {

    @PrimaryGeneratedColumn("uuid")
    productId?: string;

    @Column({ type:"text"})
    productName: string;

    @Column({ type: "float"})
    price: number;

    @Column({ type: "int" })
    countSell: number;

    @Column({ type: "uuid" })
    provider: string;
}
