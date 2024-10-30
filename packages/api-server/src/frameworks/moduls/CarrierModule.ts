import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import NCarrierUseCase from "../useCases/NCarrierUseCase"
import CarriersController from "../controllers/CarriersController"
import CarrierRepository from "../repositories/CarrierRepository"
import CarrierModel from "../models/CarrierModel"

@Module({
  imports: [SequelizeModule.forFeature([CarrierModel])],
  providers: [
    {
      provide: "ICarrierRepository",
      useClass: CarrierRepository
    },
    {
      provide: "ICarrierUseCase",
      useClass: NCarrierUseCase
    }
  ],
  controllers: [CarriersController]
})
export default class CarrierModule {}
