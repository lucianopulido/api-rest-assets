import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Asset} from "./asset";

@Entity()
export class Assetscore {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type_score: string

    @Column()
    score:number

    @ManyToMany(() => Asset, (asset) => asset.scores)
    assets: Asset[]
}