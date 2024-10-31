import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import ICarrierDTO from "@domains/dtos/interfaces/ICarrierDTO"
import ICarrierRepository from "@domains/repositories/interfaces/ICarrierRepository"
import CarrierModel from "../models/CarrierModel"
import LayerDTO from "../../domains/dtos/LayerDTO"
import CarrierDTO from "../../domains/dtos/CarrierDTO"

@Injectable()
export default class CarrierRepository implements ICarrierRepository {
  constructor(
    @InjectModel(CarrierModel)
    private carrierModel: typeof CarrierModel
  ) {}

  async getCarriers(): Promise<ILayerDTO<ICarrierDTO[]>> {
    try {
      const carrierModels = await this.carrierModel.findAll()
      const carriers = carrierModels.map((model) => {
        return new CarrierDTO({
          id: model.uid,
          no: model.no,
          name: model.name,
          displayName: model.displayName,
          isCrawlable: model.isCrawlable,
          isPopupEnabled: model.isPopupEnabled,
          popupURL: model.popupURL
        })
      })

      return new LayerDTO({
        data: carriers
      })
    } catch (error) {
      return new LayerDTO({
        isError: true,
        message: error.message
      })
    }
  }

  async getCarrier(carrierId: string): Promise<ILayerDTO<ICarrierDTO>> {
    try {
      const carrierModel = await this.carrierModel.findOne({
        where: { uid: carrierId }
      })
      const carrier = new CarrierDTO({
        id: carrierModel.uid,
        no: carrierModel.no,
        name: carrierModel.name,
        displayName: carrierModel.displayName,
        isCrawlable: carrierModel.isCrawlable,
        isPopupEnabled: carrierModel.isPopupEnabled,
        popupURL: carrierModel.popupURL
      })

      return new LayerDTO({
        data: carrier
      })
    } catch (error) {
      return new LayerDTO({
        isError: true,
        message: error.message
      })
    }
  }
}
