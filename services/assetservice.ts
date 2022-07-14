import {Asset} from "../model/asset";
import {AppDataSource} from "../database/data-source";
import {Repository} from "typeorm";

export class Assetservice {

    private assetRepository: Repository<Asset>

    constructor() {
        this.assetRepository = AppDataSource.getRepository(Asset)
    }

    async registrarAsset(asset: Asset): Promise<void> {

        try {
            await this.assetRepository.save(asset)
        } catch (err) {
            throw {
                error: {
                    ubicacionError: `ha ocurrido un error mientras se intentaba obtener el promedio de un asset`,
                    messageError: err
                }
            }
        }


    }

    async obtenerPromedioAsset(asset_type: string, type_score: string) {
        try {
            const {promedio} = await this.assetRepository.createQueryBuilder("asset")
                .select("AVG(score.score)", "promedio")
                .leftJoin("asset.scores", "score")
                .where("asset.asset_type = :asset_type", {asset_type: asset_type})
                .andWhere("score.type_score = :type_score", {type_score: type_score})
                .getRawOne()
            return promedio
        } catch (err) {
            throw {
                error: {
                    ubicacionError: `ha ocurrido un error mientras se intentaba obtener el promedio de un asset`,
                    messageError: err
                }
            }
        }

    }

    async obtenerAsset(idAsset: number) {
        try {
            const asset = await this.assetRepository.findOneBy({id: idAsset})
            let suma = 0
            asset?.scores.forEach((score) => suma += score.score)
            return {asset, suma}
        } catch (err) {
            throw {
                error: {
                    ubicacionError: `ha ocurrido un error mientras se intentaba obtener la informacion de un asset`,
                    messageError: err
                }
            }
        }
    }
}