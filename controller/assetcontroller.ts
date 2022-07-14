import {Body, Controller, Get, Param, Post, Res, UseBefore} from "routing-controllers";
import {json, Response} from "express";
import {Assetservice} from "../services/assetservice";
import {Asset} from "../model/asset";
import {StatusCodes} from "http-status-codes";

@Controller("/v1/gestion-asset")
export class Assetcontroller {


    private assetService: Assetservice

    constructor() {
        this.assetService = new Assetservice()
    }

    @Post("/asset")
    @UseBefore(json())
    async registrarAsset(@Body() asset: Asset, @Res() response: Response) {

        try {
            await this.assetService.registrarAsset(asset)
            return response.status(StatusCodes.CREATED).json({message: "se ha registrado un asset correctamente"})
        } catch (err) {
            return response.status(StatusCodes.BAD_REQUEST).json(err)
        }
    }

    @Get("/promedio/:asset_type/:type_score")
    @UseBefore(json())
    async obtenerPromedioAsset(@Param("asset_type") asset_type: string, @Param("type_score") type_score: string, @Res() response: Response) {

        try {
            const promedio = await this.assetService.obtenerPromedioAsset(asset_type, type_score)
            return response.status(StatusCodes.OK).json({promedio: promedio})
        } catch (err) {
            return response.status(StatusCodes.BAD_REQUEST).json(err)
        }
    }

    @Get("/asset/:idAsset")
    @UseBefore(json())
    async obtenerAsset(@Param("idAsset") idAsset: number, @Res() response: Response) {

        try {
            const promedio = await this.assetService.obtenerAsset(idAsset)
            return response.status(StatusCodes.OK).json({promedio: promedio})
        } catch (err) {
            return response.status(StatusCodes.BAD_REQUEST).json(err)
        }
    }


}