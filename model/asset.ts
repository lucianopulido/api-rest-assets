import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Assetscore} from "./assetscore";

@Entity()
export class Asset {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    asset_type: string

    @Column()
    name: string

    @ManyToMany(() => Assetscore, (scores) => scores.assets, {cascade: ["insert", "update"], eager: true})
    @JoinTable({
        name: "asset_score",
        joinColumn: {name: "id_asset", referencedColumnName: "id"},
        inverseJoinColumn: {name: "id_asset_score", referencedColumnName: "id"}
    })
    scores: Assetscore[]
}