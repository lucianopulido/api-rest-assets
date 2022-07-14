import "reflect-metadata"
import {DataSource} from "typeorm";
import {Asset} from "../model/asset";
import {Assetscore} from "../model/assetscore";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Emprendamos2022@",
    database: "assets",
    synchronize: false,
    logging: false,
    entities: [Asset, Assetscore],
    subscribers: [],
    migrations: [],
    insecureAuth: true,
})

AppDataSource.initialize()
    .then(() => {
        console.log("La BD de mysql ha sido inicializada")
    })
    .catch((error) => console.log(error))


